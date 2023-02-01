import { combineReducers } from 'redux'
import auth from './authReducer'
import alert from './alertReducers'
import categories from './categoryReducers'
import homeBlogs from './homeBlogReducers'
import blogsCategory from './blogCategoryReducer'
import otherInfo from './otherInfoReducer'
import blogsUser from './blogUserReducer'
import comments from './commentReducer'
import socket from './socketReducer'

export default combineReducers({
  auth,
  alert,
  categories,
  homeBlogs,
  blogsCategory,
  otherInfo,
  blogsUser,
  comments,
  socket,
})
