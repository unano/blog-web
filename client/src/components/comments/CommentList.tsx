import React, { useState } from 'react'
import { IComment } from '../../utils/TypeScript'
import { Link } from 'react-router-dom';
import Input from "./Input";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../../utils/TypeScript";
import { replyComment } from "../../redux/actions/commentAction";
import { IUser } from "../../utils/TypeScript";

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
  const handleReply = (body: string) => {
    if (!auth.user || !auth.access_token) return;

    const data = {
      user: auth.user,
      blog_id: comment.blog_id,
      blog_user_id: comment.blog_user_id,
      content: body,
      reply_user: comment.user,
      comment_root: comment.comment_root || comment._id,
      createdAt: new Date().toISOString(),
    };
    setShowReply([...showReply, data]);
    dispatch(replyComment(data, auth.access_token) as any);
    setOnReply(false);
  };
  return (
    <div className="comment_content">
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
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: comment.content,
        }}
      />
      <small className="reply" onClick={() => setOnReply(!onReply)}>
        {onReply ? "Cancel" : "Reply"}
      </small>
      <div>{onReply && <Input callback={handleReply} />}</div>
      {children}
    </div>
  );
};

export default CommentList