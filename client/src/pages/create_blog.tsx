import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootStore, IBlog, IUser } from '../utils/TypeScript'
import { validCreateBlog, shallowEqual } from '../utils/Valid'
import NotFound from '../components/global/NotFound'
import CardHoriz from '../components/cards/CardHoriz'
import CreateForm from '../components/cards/CreateForm'
import ReactQuill from '../components/editor/ReactQuill'
import { ALERT } from '../redux/types/alertType'
import { createBlog, updateBlog } from '../redux/actions/blogAction'
import { getAPI } from '../utils/FetchData'
import { useNavigate, useLocation } from 'react-router-dom'

interface IProps {
  id?: string
}

const CreateBlog: React.FC<IProps> = ({ id }) => {
  const initState = {
    user: '',
    title: '',
    content: '',
    description: '',
    thumbnail: '',
    category: '',
    createdAt: new Date().toISOString(),
  }

  const [blog, setBlog] = useState<IBlog>(initState)
  const [body, setBody] = useState('')
  const [text, setText] = useState('')
  const divRef = useRef<HTMLDivElement>(null)
  const { auth } = useSelector((state: RootStore) => state)
  const dispatch = useDispatch()
  const [oldData, setOldData] = useState<IBlog>(initState)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!id) return
    getAPI(`blog/${id}`)
      .then((res) => {
        setBlog(res.data)
        setBody(res.data.content)
        setOldData(res.data)
      })
      .catch((err) => console.log(err))

    //prevent unmount error, 不知道情况就试试直接从该界面切换
    const initData = {
      user: '',
      title: '',
      content: '',
      description: '',
      thumbnail: '',
      category: '',
      createdAt: new Date().toISOString(),
    }

    return () => {
      setBlog(initData)
      setBody('')
      setOldData(initData)
    }
  }, [id])

  useEffect(() => {
    const div = divRef.current
    if (!div) return
    const content = div?.innerText as string
    setText(content)
  }, [body])

  const handleSubmit = async () => {
    if (!auth.access_token) return
    const check = validCreateBlog({ ...blog, content: text })
    if (check.errLength > 0)
      return dispatch({ type: ALERT, payload: { errors: check.errMsg } })

    const newData = { ...blog, content: body }
    if (id) {
      const result = shallowEqual(newData, oldData)
      if ((blog.user as IUser)._id !== auth.user?._id)
        return dispatch({
          type: ALERT,
          payload: { errors: 'Invalid Authentication' },
        })
      if (result)
        return dispatch({
          type: ALERT,
          payload: { errors: 'The data does not change' },
        })
      await dispatch(updateBlog(newData, auth.access_token) as any)
      navigate(`/profile/${auth.user?._id}`)
    } else {
      await dispatch(createBlog(newData, auth.access_token) as any)
      navigate(`/profile/${auth.user?._id}`)
    }
  }

  if (!auth.access_token) return <NotFound />

  return (
    <div className="create_blog">
      <div className="create_blog_up">
        <div className="create_blog_up_update">
          <h2>New Blog</h2>
          <CreateForm blog={blog} setBlog={setBlog} />
        </div>
        <div className="create_blog_up_right">
          <h5>Preview</h5>
          <CardHoriz blog={blog} />
        </div>
      </div>
      <div className="create_blog_down">
        {(blog.content || location.pathname === '/create_blog') && (
          <ReactQuill setBody={setBody} body={body} />
        )}
        <div
          ref={divRef}
          dangerouslySetInnerHTML={{
            __html: body,
          }}
          style={{ display: 'none' }}
        />
        <div className="create_post">
          <small>{text.length}</small>
          <button onClick={handleSubmit}>
            {id ? 'Update Post' : 'Create Post'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateBlog
