import React from 'react'
import { IBlog } from '../../utils/TypeScript';
import { Link } from 'react-router-dom';
interface IProps{
    blog: IBlog
}

const SearchCard: React.FC<IProps> = ({ blog }) => {
    return (
      <Link to={`/blog/${blog._id}`}>
        <div className="searchCard">
          {typeof blog.thumbnail === "string" && (
            <div className="thumbnail">
              <img src={blog.thumbnail} alt="thumbnail" />
            </div>
          )}
          <div>
            <div className="title">{blog.title}</div>
            <div className="time">
              {new Date(blog.createdAt).toLocaleString()}
            </div>
            <div className='descrip'>{blog.description}</div>
          </div>
        </div>
      </Link>
    );
};
export default SearchCard