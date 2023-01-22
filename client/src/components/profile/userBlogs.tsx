import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useLocation } from 'react-router-dom'
import { getBlogsByUserId } from '../../redux/actions/blogAction'
import { IBlog, IParams, RootStore } from '../../utils/TypeScript'
import Loading from '../alert/Loading'
import CardHoriz from '../cards/CardHoriz'
import Pagination from '../global/Pagination'

const UserBlogs = () => {
  const { blogsUser } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();
  const { slug }: IParams = useParams();
  const location = useLocation();
  let search = location.search;
  let user_id = slug;

  const [blogs, setBlogs] = useState<IBlog[]>();
  const [total, setTotal] = useState(0);

  const handlePagination = (num: number) => {
    const search = `?page=${num}`;
    if(user_id) dispatch(getBlogsByUserId(user_id, search) as any);
  }


  useEffect(() => {
    if (!user_id) return;
      if (blogsUser.every((item) => item.id !== user_id)) {
        dispatch(getBlogsByUserId(user_id, search) as any) ;
      } else {
        const data = blogsUser.find(item => item.id === user_id)
        if (!data) return
        setBlogs(data.blogs)
        setTotal(data.total)
      }
  }, [user_id, blogsUser, dispatch])
  
  if (!blogs) return <Loading />
  if (blogs.length === 0) return (
    <h3>No Blogs</h3>
  )
  return (
    <div className="user_blogs">
      <div className='blogs'>
        {blogs.map((blog) => (
          <CardHoriz key={blog._id} blog={blog} />
        ))}
      </div>
      <div>
        {total > 1 && <Pagination total={total} callback={handlePagination} />}
      </div>
    </div>
  );
}

export default UserBlogs