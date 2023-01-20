import React from 'react'
import { IComment } from '../../utils/TypeScript'
import { Link } from 'react-router-dom';
interface IProps {
  comment: IComment;
}
const CommentList:React.FC<IProps> = ({comment}) => {
  return (
    <div className="comment_content">
      <div className="info">
        <small className="name">
          <Link to={`profile/${comment.user._id}`}>{comment.user.name}</Link>
        </small>
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
    </div>
  );
}

export default CommentList