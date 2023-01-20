import React from 'react'
import { IComment } from '../../utils/TypeScript'
import AvatarComment from './AvatarComment'
import CommentList from './CommentList'

interface IProps {
  comment: IComment
}

const Comments: React.FC<IProps> = ({ comment }) => {
  return (
    <div className="blog_outer">
      <div
        className="blog_comment"
        style={{
          opacity: comment._id ? 1 : 0.5,
          pointerEvents: comment._id ? "initial" : "none",
        }}
      >
        <AvatarComment user={comment.user} />
        <CommentList comment={comment} />
      </div>
    </div>
  );
}

export default Comments