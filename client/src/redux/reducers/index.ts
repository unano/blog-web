import { combineReducers } from 'redux'
import auth from './authReducer'
import alert from './alertReducers'
import categories from "./categoryReducers"
import homeBlogs from "./homeBlogReducers"

export default combineReducers({
    auth,
    alert,
    categories,
    homeBlogs
})