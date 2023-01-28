import e, { Response } from "express"
import { IReqAuth } from "../config/interface"
import Users from "../models/userModel"
import bcrypt from 'bcrypt'

const userCtrl = {
  updateUser: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication" });

    try {
      const { avatar, name } = req.body;

      const user = await Users.findOneAndUpdate(
        { _id: req.user._id },
        {
          avatar,
          name,
        }
      );

      res.json({ msg: "Update Success", user });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  resetPassword: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication" });

    try {
      const { password } = req.body;
      const passwordHash = await bcrypt.hash(password, 12);

      const user = await Users.findOneAndUpdate(
        { _id: req.user._id },
        {
          password: passwordHash,
        }
      );

      res.json({ msg: "Reset Password Success", user });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUser: async (req: IReqAuth, res: Response) => {
    try {
      const user = await Users.findById(req.params.id).select(
        "-password -followers -followings"
      );
      res.json(user);
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  followUser: async (req: IReqAuth, res: Response) => {
    const follow_user_id = req.params.id
    if (!req.body?.user_id)
      return res.status(400).json({ msg: "Invalid Authentication" });
    try {
      const { user_id } = req.body;
      const follow_user = await Users.findById(follow_user_id);
      if (!follow_user)
        return res.status(400).json({ msg: "Invalid Data Input" });
      const isFollowing = await Users.findOne({
        _id: follow_user_id,
        followings: user_id,
      });
      if (isFollowing)
        return res.status(400).json({ msg: "Duplicate following" });
      const user = await Users.findOneAndUpdate(
        { _id: follow_user_id },
        {
          $push: { followings: user_id },
          $inc: { following_num: 1 },
        }
      );
      const user2 = await Users.findOneAndUpdate(
        { _id: user_id },
        {
          $push: { followers: follow_user_id },
          $inc: { follower_num: 1 },
        }
      );
      return res.json({ user, user2 });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  unfollowUser: async (req: IReqAuth, res: Response) => {
    const follow_user_id = req.params.id;
    if (!req.body?.user_id)
      return res.status(400).json({ msg: "Invalid Authentication" });
    try {
      const { user_id } = req.body;
      const follow_user = await Users.findById(follow_user_id);
      if (!follow_user)
        return res.status(400).json({ msg: "Invalid Data Input" });
      const isFollowing = await Users.findOne({
        _id: follow_user_id,
        followings: user_id,
      });
      if (!isFollowing)
        return res.status(400).json({ msg: "Invalid input" });
      const user = await Users.findOneAndUpdate(
        { _id: follow_user_id },
        {
          $pull: { followings: user_id },
          $inc: { following_num: -1 },
        }
      );
      const user2 = await Users.findOneAndUpdate(
        { _id: user_id },
        {
          $pull: { followers: follow_user_id },
          $inc: { follower_num: -1 },
        }
      );
      return res.json({ user, user2 });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getIsFollowed: async (req: IReqAuth, res: Response) => {
    const { f_ing_id, f_ed_id } = req.query;
    try {
      const isFollowing = await Users.findOne({
        _id: f_ing_id,
        followings: f_ed_id,
      });
      if (isFollowing) return res.json({ isFollowing: true });
      else return res.json({ isFollowing: false });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
};

export default userCtrl;
