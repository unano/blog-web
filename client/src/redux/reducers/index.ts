import { combineReducers } from 'redux'
import auth from './authReducer'
import alert from './alertReducers'

export default combineReducers({
    auth,
    alert
})