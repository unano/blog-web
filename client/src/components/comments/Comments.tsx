import React, { useState, useEffect } from "react";
import { IComment } from "../../utils/TypeScript";
import CommentList from "./CommentList";
import AvatarReply from "./AvatarReply";

interface IProps {
  comment: IComment;
}

const Comments: React.FC<IProps> = ({ comment }) => {
  const [showReply, setShowReply] = useState<IComment[]>([]);
  const [next, setNext] = useState(2)
  
  useEffect(() => {
    if(!comment.replyCM) return;
    setShowReply(comment.replyCM)
  },[comment.replyCM])
  

  return (
    <div className="blog_outer">
      <div
        className="blog_comment"
        style={{
          opacity: comment._id ? 1 : 0.5,
          pointerEvents: comment._id ? "initial" : "none",
        }}
      >
        <div className="blog_comment_avatar">
          <img src={comment.user.avatar} alt="avatar" />
        </div>
        <div className="blog_comment_content">
          <CommentList
            comment={comment}
            showReply={showReply}
            setShowReply={setShowReply}
          >
            {showReply.slice(0, next).map((comment, index) => (
              <div className="blog_outer blog_outer_reply" key={index}>
                <div
                  className="blog_comment"
                  style={{
                    opacity: comment._id ? 1 : 0.5,
                    pointerEvents: comment._id ? "initial" : "none",
                  }}
                >
                  <AvatarReply user={comment.user} />
                  <CommentList
                    comment={comment}
                    showReply={showReply}
                    setShowReply={setShowReply}
                    reply_user={comment.reply_user}
                  />
                </div>
              </div>
            ))}
            <div className="more_comment">
              {showReply.length - next > 0 ? (
                <small onClick={() => setNext(next + 5)}>
                  See more comments
                </small>
              ) : (
                showReply.length > 2 && (
                  <small onClick={() => setNext(2)}>Hide comments</small>
                )
              )}
            </div>
          </CommentList>
        </div>
      </div>
    </div>
  );
};

export default Comments;