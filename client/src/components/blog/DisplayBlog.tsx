
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IBlog, RootStore, IUser, IComment } from "../../utils/TypeScript";
import Input from "../comments/Input";
import Comments from "../comments/Comments";
import { getComments, createComment } from "../../redux/actions/commentAction";
// import { thumbs } from "../../redux/actions/blogAction";
import Loading from "../alert/Loading";
import Pagination from "../global/Pagination";
import { MdOutlineThumbUpAlt, MdThumbUpAlt } from "react-icons/md";
import { patchAPI } from "../../utils/FetchData";
import { ALERT } from "../../redux/types/alertType";
import { checkTokenExp } from "../../utils/checkTokenExp";

interface IProps {
  blog: IBlog;
}

const DisplayBlog: React.FC<IProps> = ({ blog }) => {
  const { auth, comments } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();

  const [showComments, setShowComments] = useState<IComment[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const [thumbed, setThumbed] = useState<boolean | null>(null);
  const [thumb_count, setThumbeCount] = useState(blog.thumbs_count);

  const location = useLocation();
  const navigate = useNavigate();

  const handleComment = (body: string) => {
    if (!auth.user || !auth.access_token) return;

    const data = {
      content: body,
      user: auth.user,
      blog_id: blog._id as string,
      blog_user_id: (blog.user as IUser)._id,
      replyCM: [],
      thumbs: [],
      thumbs_count: 0,
      createdAt: new Date().toISOString(),
    };

    setShowComments([data, ...showComments]);
    dispatch(createComment(data, auth.access_token) as any);
  };

  const handlePagination = (num: number) => {
    if (!blog._id) return;
    fetchComments(blog._id, num);
  };

  const handleThumb = async () => {
    if (!auth.user || !auth.access_token) {
      navigate("/login");
      return;
    } 
    const result = await checkTokenExp(auth.access_token, dispatch);
    const access_token = result ? result : auth.access_token;
    if (!blog._id) return;

    let num = thumbed ? -1 : 1;
    setThumbed(!thumbed);
    if (thumb_count !== undefined) setThumbeCount(thumb_count + num);
    try {
      await patchAPI(`blog/thumb/${blog._id}`, {
        user_id: auth.user._id,
        thumbed: thumbed,
      }, access_token);
    } catch (err: any) {
      dispatch({
        type: ALERT,
        payload: { errors: err.response.data.msg },
      });
    }
    //dispatch(thumbs(auth.user?._id, blog._id, thumbed, auth.access_token) as any)
  };

  useEffect(() => {
    const hasThumbed = !!blog?.thumbs?.filter(
      (user) => user.user_id === auth.user?._id
    ).length;
    setThumbed(hasThumbed);
  }, [blog?.thumbs]);

  useEffect(() => {
    setThumbeCount(blog.thumbs_count);
  }, [blog.thumbs_count]);

  useEffect(() => {
    console.log(comments.data)
    if (comments.data.length === 0) return;
    setShowComments(comments.data);
    setTotal(comments.total);
  }, [comments.data]);

  const fetchComments = useCallback(async (id: string, num = 1) => {
    setLoading(true);
    await dispatch(getComments(id, num) as any);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!blog._id) return;
    const num = Number(location.search.slice(6)) || 1;
    fetchComments(blog._id, num);
  }, [blog._id, fetchComments, location]);

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

      <div
        className="blog_content"
        dangerouslySetInnerHTML={{
          __html: blog.content,
        }}
      />
      <div className="thumbs">
        <div className="count">{thumb_count}</div>
        <div className="thumbing" onClick={handleThumb}>
          {thumbed ? <MdThumbUpAlt /> : <MdOutlineThumbUpAlt />}
        </div>
      </div>

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
      {comments.total > 1 && (
        <Pagination total={comments.total} callback={handlePagination} />
      )}
    </>
  );
};

export default DisplayBlog;