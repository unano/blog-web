

import React, { useState } from "react";
import { IComment } from "../../utils/TypeScript";
import { Link } from "react-router-dom";
import Input from "./Input";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../../utils/TypeScript";
import { replyComment } from "../../redux/actions/commentAction";
import { IUser } from "../../utils/TypeScript";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { endsWith } from "cypress/types/lodash";
import { updateComment } from "../../redux/actions/commentAction";
import { deleteComment } from "../../redux/actions/commentAction";

interface IProps {
  comment: IComment;
  showReply: IComment[];
  setShowReply: (showReply: IComment[]) => void;
  children?: React.ReactNode;
  reply_user?: IUser;
}

const CommentList: React.FC<IProps> = ({
  children,
  comment,
  showReply,
  setShowReply,
  reply_user,
}) => {
  const { auth } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();
  const [onReply, setOnReply] = useState(false);
  const [edit, setEdit] = useState<IComment>();

  const handleReply = (body: string) => {
    if (!auth.user || !auth.access_token) return;

    const data = {
      user: auth.user,
      blog_id: comment.blog_id,
      blog_user_id: comment.blog_user_id,
      content: body,
      replyCM: [],
      reply_user: comment.user,
      comment_root: comment.comment_root || comment._id,
      createdAt: new Date().toISOString(),
    };
    setShowReply([...showReply, data]);
    dispatch(replyComment(data, auth.access_token) as any);
    setOnReply(false);
  };

  const handleDelete = (comment: IComment) => {
    if (!auth.access_token || !auth.user) return;
    dispatch(deleteComment(comment, auth.access_token) as any);
  };

  const Nav = (comment: IComment) => {
    return (
      <div className="edit_and_delete">
        <div onClick={() => handleDelete(comment)}>
          <AiOutlineDelete />
        </div>
        <div onClick={() => setEdit(comment)}>
          <AiOutlineEdit />
        </div>
      </div>
    );
  };
  const handleUpdate = (body: string) => {
    if (!auth.user || !auth.access_token || !edit) return;
    if (body === edit.content) return setEdit(undefined);

    const newComment = { ...edit, content: body };
    dispatch(updateComment(newComment, auth.access_token) as any);
    setEdit(undefined);
  };

  return (
    <div className="comment_content">
      {edit ? (
        <Input callback={handleUpdate} edit={edit} setEdit={setEdit} />
      ) : (
        <>
          <div className="info_and_name">
            <div className="info">
              <small className="name">
                <Link to={`/profile/${comment.user._id}?page=1`}>
                  {comment.user.name}
                </Link>
              </small>
              {reply_user?._id && (
                <small className="reply_to">
                  Reply to{" "}
                  <Link to={`/profile/${reply_user?._id}?page=1`}>
                    {reply_user?.name}
                  </Link>
                </small>
              )}
              <br />
              <small className="time">
                {new Date(comment.createdAt).toLocaleString()}
              </small>
              <small>
                <div className="dels_and_upds">
                  {comment.blog_user_id === auth.user?._id ? (
                    comment.user._id === auth.user?._id ? (
                      Nav(comment)
                    ) : (
                      <div
                        className="delete_others_comment"
                        onClick={() => handleDelete(comment)}
                      >
                        <div>
                          <AiOutlineDelete />
                        </div>
                      </div>
                    )
                  ) : (
                    comment.user._id === auth.user?._id && Nav(comment)
                  )}
                </div>
              </small>
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: comment.content,
              }}
            />
          </div>

          <small className="reply" onClick={() => setOnReply(!onReply)}>
            {onReply ? "Cancel" : "Reply"}
          </small>
          <div>{onReply && <Input callback={handleReply} />}</div>
        </>
      )}
      {children}
    </div>
  );
};

export default CommentList;