import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootStore } from '../utils/TypeScript';
import CardVert from "../components/cards/CardVert"

const Index = () => {
  const { homeBlogs } = useSelector((state: RootStore) => state);
  console.log(homeBlogs)
  return (
    <div className='home_blogs'>
      {homeBlogs.map((homeBlog) => (
        <div key={homeBlog._id}>
          {homeBlog.count > 0 && (
            <>
              <h3>
                <Link to={`/blogs/${homeBlog.name.toLowerCase()}`}>
                  {homeBlog.name} <small>{homeBlog.count}</small>
                </Link>
              </h3>
              <div className='card_verts'>
                {homeBlog.blogs.map((blog) => (
                  <CardVert key={blog._id} blog={blog} />
                ))}
              </div>
            </>
          )}
          {homeBlog.count > 4 && <Link to={`/blogs/${homeBlog.name}`}>
            Read more &gt; &gt;
          </Link>}
        </div>
      ))}
    </div>
  );
}

export default Index;