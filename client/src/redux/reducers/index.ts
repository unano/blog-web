import { combineReducers } from 'redux'
import auth from './authReducer'
import alert from './alertReducers'
import categories from "./categoryReducers"
import homeBlogs from "./homeBlogReducers"
import blogsCategory from './blogCategoryReducer'
export default combineReducers({
    auth,
    alert,
    categories,
    homeBlogs,
    blogsCategory
})