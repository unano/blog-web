import { Request, Response } from "express";
import comments from "../models/commentsModel";
import { IReqAuth } from "../config/interface";
import mongoose from "mongoose";
import { io } from "../index"
const Pagination = (req: IReqAuth) => {
  let page = Number(req.query.page) * 1 || 1;
  let limit = Number(req.query.limit) * 1 || 4;
  let skip = (page - 1) * limit;

  return { page, limit, skip };
};

const commentCtrl = {
  createComment: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "invalid Authentication" });
    try {
      const { content, blog_id, blog_user_id } = req.body;

      const newComment = new comments({
        user: req.user._id,
        content,
        blog_id,
        blog_user_id,
      });
      
      const data = {
        ...newComment._doc,
        user: req.user,
        createdAt: new Date().toISOString()
      }
      
      io.to(`${blog_id}`).emit('createComment', data)

      await newComment.save();

      return res.json(newComment);
    } catch (err: any) {
      return res.status(500).json({ msg: err.msg });
    }
  },
  getComments: async (req: Request, res: Response) => {
    const { limit, skip } = Pagination(req);
    try {
      const data = await comments.aggregate([
        {
          $facet: {
            totalData: [
              {
                $match: {
                  blog_id: new mongoose.Types.ObjectId(req.params.id),
                  comment_root: { $exists: false },
                  reply_user: { $exists: false },
                },
              },
              {
                $lookup: {
                  from: "users",
                  let: { user_id: "$user" },
                  pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
                    { $project: { name: 1, avatar: 1 } },
                  ],
                  as: "user",
                },
              },
              { $unwind: "$user" },
              {
                $lookup: {
                  from: "comments",
                  let: { cm_id: "$replyCM" },
                  pipeline: [
                    { $match: { $expr: { $in: ["$_id", "$$cm_id"] } } },
                    {
                      $lookup: {
                        from: "users",
                        let: { user_id: "$user" },
                        pipeline: [
                          { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
                          { $project: { name: 1, avatar: 1 } },
                        ],
                        as: "user",
                      },
                    },
                    { $unwind: "$user" },
                    {
                      $lookup: {
                        from: "users",
                        let: { user_id: "$reply_user" },
                        pipeline: [
                          { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
                          { $project: { name: 1, avatar: 1 } },
                        ],
                        as: "reply_user",
                      },
                    },
                    { $unwind: "$reply_user" },
                  ],
                  as: "replyCM",
                },
              },
              { $sort: { createdAt: -1 } },
              { $skip: skip },
              { $limit: limit },
            ],
            totalCount: [
              {
                $match: {
                  blog_id: new mongoose.Types.ObjectId(req.params.id),
                  comment_root: { $exists: false },
                  reply_user: { $exists: false },
                },
              },
              { $count: "count" },
            ],
          },
        },
        {
          $project: {
            count: { $arrayElemAt: ["$totalCount.count", 0] },
            totalData: 1,
          },
        },
      ]);
      const allComments = data[0].totalData;
      const count = data[0].count;
      let total = 0;

      if (count % limit === 0) {
        total = count / limit;
      } else {
        total = Math.floor(count / limit) + 1;
      }

      return res.json({ allComments, total });
    } catch (err: any) {
      return res.status(500).json({ msg: err.msg });
    }
  },
  replyComment: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "invalid Authentication." });

    try {
      const { content, blog_id, blog_user_id, comment_root, reply_user } =
        req.body;

      const newComment = new comments({
        user: req.user._id,
        content,
        blog_id,
        blog_user_id,
        comment_root,
        reply_user: reply_user._id,
      });

      await comments.findOneAndUpdate(
        { _id: comment_root },
        {
          $push: { replyCM: newComment._id },
        }
      );

      const data = {
        ...newComment._doc,
        user: req.user,
        reply_user: reply_user,
        createdAt: new Date().toISOString(),
      };

      io.to(`${blog_id}`).emit("replyComment", data);

      await newComment.save();

      return res.json(newComment);
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateComment: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "invalid Authentication." });

    try {
      const { data } = req.body;
      const comment = await comments.findOneAndUpdate(
        {
          _id: req.params.id,
          user: req.user.id,
        },
        { content: data.content }
      );
      if (!comment)
        return res.status(500).json({ msg: "Comment does not exists" });
      io.to(`${data.blog_id}`).emit("updateComment", data);
      
      return res.json({ msg: "Update Success!" });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteComment: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "invalid Authentication." });

    try {
      const comment = await comments.findOneAndDelete(
        {
          _id: req.params.id,
          $or: [
            { user: req.user._id },
            {blog_user_id: req.user._id}
          ]
        },
      );
      if (!comment)
        return res.status(400).json({ msg: "Comment does not exists" });
      if (comment.comment_root) {
        await comments.findOneAndUpdate({ _id: comment.comment_root }, {
          $pull : { replyCM: comment._id}
        })
      } else {
        await comments.deleteMany({_id: {$in: comment.replyCM}})
      }

      io.to(`${comment.blog_id}`).emit('deleteComment', comment)
      
      return res.json({ msg: "Update Success!" });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  dealThumbs: async(req: Request, res: Response) => {
    const { user_id, thumbed } = req.body; //state为true,说明要取消点赞
    const comment_id = req.params.id;
    const user = await comments.findOne({ _id: comment_id, thumbs: user_id })
    if (thumbed) {
      if (!user) return res.status(400).json({ msg: "Invalid Input" });
      await comments.findOneAndUpdate(
        { _id: comment_id },
        {
          $pull: { thumbs: user_id },
          $inc: { thumbs_count: -1 },
        }
      );
    } else {
      if (user)
        return res.status(400).json({ msg: "Duplicate thumb is not allowed" });
      await comments.findOneAndUpdate(
        { _id: comment_id },
        {
          $push: { thumbs: user_id },
          $inc: { thumbs_count: 1 },
        }
      );
    }
    res.json({msg:"Success"})
  }
};
export default commentCtrl;
