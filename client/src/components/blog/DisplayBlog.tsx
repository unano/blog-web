import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IBlog, RootStore, IUser, IComment } from "../../utils/TypeScript";
import Input from "../comments/Input";
import Comments from "../comments/Comments";
import { getComments } from "../../redux/actions/commentAction";
import { createComment } from "../../redux/actions/commentAction";
import Loading from "../alert/Loading";

interface IProps {
  blog: IBlog;
}

const DisplayBlog: React.FC<IProps> = ({ blog }) => {
  const { auth, comments } = useSelector((state: RootStore) => state)
  const dispatch = useDispatch()

  const [showComments, setShowComments] = useState<IComment[]>([])
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const handleComment = (body: string) => {
    if (!auth.user || !auth.access_token) return;

    const data = {
      content: body,
      user: auth.user,
      blog_id: (blog._id as string),
      blog_user_id: (blog.user as IUser)._id,
      createdAt: new Date().toISOString()
    }

    setShowComments([data, ...showComments])
    dispatch(createComment(data, auth.access_token) as any)
  }

  useEffect(() => {
    if ((comments.data.length === 0)) return
    setShowComments(comments.data)
    setTotal(comments.total);
  }, [comments.data])

  const fetchComments = useCallback(async (id: string) => {
    setLoading(true)
    await dispatch(getComments(id) as any)
    setLoading(false)
  }, [])
  
  
  useEffect(() => {
    if (!blog._id) return;

    fetchComments(blog._id)
  },[blog._id])

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
            <small className="blog_date">
              {new Date(blog.createdAt).toDateString()}
            </small>
          </div>
        </div>
      </div>

      <div className="blog_content"
        dangerouslySetInnerHTML={{
          __html: blog.content,
        }}
      />

      <div className="comments_title">
        <h3>Comments</h3>
      </div>
      {auth.user ? (
        <Input callback={handleComment} />
      ) : (
        <h5>
          Please <Link to={`/login?blog/${blog._id}`}>login</Link> to comment.
        </h5>
      )}
      {loading ? (
        <Loading />
      ) : (
        showComments?.map((comment, index) => (
          <Comments key={index} comment={comment} />
        ))
      )}
    </>
  );
};

export default DisplayBlog;