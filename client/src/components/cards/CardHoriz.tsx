
import React from "react";
import { IBlog } from "../../utils/TypeScript";
import { Link } from "react-router-dom";

interface IProps {
  blog: IBlog;
}
const CardHoriz: React.FC<IProps> = ({ blog }) => {
  return (
    <div>
      <div className="thumbnail">
        {blog.thumbnail && (
          <>
            {typeof blog.thumbnail === "string" ? (
              <Link to={`/blog/${blog._id}`}>
                <img src={blog.thumbnail} alt="thumbnail" />
              </Link>
            ) : (
              <Link to={`/blog/${blog._id}`}>
                <img
                  src={URL.createObjectURL(blog.thumbnail)}
                  alt="thumbnail"
                />
              </Link>
            )}
          </>
        )}
      </div>
      <div className="shown_content">
        <div className="shown_title">{blog.title}</div>
        <div className="shown_descrp">{blog.description}</div>
        <small>{new Date(blog.createdAt).toLocaleString()}</small>
      </div>
    </div>
  );
};

export default CardHoriz;