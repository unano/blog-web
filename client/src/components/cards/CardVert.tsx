import React from 'react'
import { IBlog } from '../../utils/TypeScript'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

interface IProps {
  blog: IBlog
}
const CardVert: React.FC<IProps> = ({ blog }) => {
  return (
    <div className="card_vert">
      <div className="card_thumbnail">
        {typeof blog.thumbnail === 'string' && (
          <LazyLoadImage
            style={{ transition: 'all 0.5s' }}
            src={blog.thumbnail}
            effect="blur"
            className="image"
            alt="b"
          />
        )}
      </div>
      <div className="card_content">
        <div className="card_title">
          <Link to={`/blog/${blog._id}`}>{blog.title.slice(0, 50)}</Link>
        </div>
        <div className="card_descrp">{blog.description.slice(0, 100)}</div>
        <p className="card_author">
          <small>
            {typeof blog.user !== 'string' && (
              <Link to={`/profile/${blog.user._id}?page=1`}>
                <small>By: </small> {blog.user.name}
              </Link>
            )}
          </small>
          <small>{new Date(blog.createdAt).toLocaleString()}</small>
        </p>
      </div>
    </div>
  )
}

export default CardVert
