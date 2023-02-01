import React from 'react'
import { useParams } from 'react-router-dom'
import CreateBlog from '../create_blog'

const UpdateBlog = () => {
  const { slug } = useParams()
  return <CreateBlog id={slug} />
}

export default UpdateBlog
