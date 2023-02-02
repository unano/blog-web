import React from 'react'
import { IBlog, IParams, IUser, RootStore } from '../../utils/TypeScript'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { TfiPencilAlt, TfiEraser } from 'react-icons/tfi'
import { deleteBlog } from '../../redux/actions/blogAction'
import { ALERT } from '../../redux/types/alertType'
import { LazyLoadImage } from 'react-lazy-load-image-component'

interface IProps {
  blog: IBlog
}
const CardHoriz: React.FC<IProps> = ({ blog }) => {
  const { page, slug }: IParams = useParams()
  const { auth } = useSelector((state: RootStore) => state)
  const dispatch = useDispatch()

  const handleDelete = () => {
    if (!auth.user || !auth.access_token) return

    if (slug !== auth.user._id)
      return dispatch({
        type: ALERT,
        payload: { errors: 'invalid Authentication' },
      })
    if (window.confirm('Do you want to delete this blog?')) {
      dispatch(deleteBlog(blog, auth.access_token) as any)
    }
  }
  return (
    <div className="cardHoriz">
      <div className="thumbnail">
        {blog.thumbnail && (
          <>
            {typeof blog.thumbnail === 'string' ? (
              <Link to={`/blog/${blog._id}`}>
                <LazyLoadImage
                  src={blog.thumbnail}
                  effect="black-and-white"
                  alt="thumbnail"
                />
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
      {slug &&
        page === 'profile' &&
        (blog.user as IUser)._id === auth.user?._id && (
          <>
            <div className="modify">
              <Link to={`/update_blog/${blog._id}`}>
                <TfiPencilAlt />
              </Link>
            </div>
            <div
              className="modify delete"
              onClick={handleDelete}
              onKeyUp={handleDelete}
              role="button"
              tabIndex={0}
            >
              <TfiEraser />
            </div>
          </>
        )}
    </div>
  )
}

export default CardHoriz
