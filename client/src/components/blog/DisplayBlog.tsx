


import React from "react";
import { IBlog } from "../../utils/TypeScript";

interface IProps {
  blog: IBlog;
}

const DisplayBlog: React.FC<IProps> = ({ blog }) => {
  return (
    <>
      <div className="blog_up">
        <div className="blog_thumbnail">
          <img src={String(blog.thumbnail)} alt="thumbnail" />
        </div>
        <div className="blog_intro">
          <h2>{blog.title}</h2>
          <div className="blog_intro_extra">
            <div className="blog_author">
              {typeof blog.user !== "string" && `By: ${blog.user.name}`}
            </div>
            <small className="blog_date">{new Date(blog.createdAt).toDateString()}</small>
          </div>
        </div>
      </div>

      <div
        dangerouslySetInnerHTML={{
          __html: blog.content,
        }}
      />
    </>
  );
};

export default DisplayBlog;