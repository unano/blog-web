

import React from "react";
import { IBlog, IParams, IUser, RootStore } from "../../utils/TypeScript";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

interface IProps {
  blog: IBlog;
}
const CardHoriz: React.FC<IProps> = ({ blog }) => {
  const { slug }: IParams = useParams();
  const { auth } = useSelector((state: RootStore) => state)
  return (
    <div className="cardHoriz">
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
        <div className="shown_title">
          <Link to={`/blog/${blog._id}`}>{blog.title}</Link>
        </div>
        <div className="shown_descrp">{blog.description}</div>
        <small>{new Date(blog.createdAt).toLocaleString()}</small>
      </div>
      {slug && ((blog.user as IUser)._id === auth.user?._id) &&(
        <div>
          <Link to={`/update_blog/${blog._id}`}>Update</Link>
        </div>
      )}
    </div>
  );
};

export default CardHoriz;