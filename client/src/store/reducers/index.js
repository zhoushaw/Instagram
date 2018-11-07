import { combineReducers } from 'redux'
import userInfo from './userInfo'
import visibilityFilter from './visibilityFilter'
export default combineReducers({
    userInfo,
    visibilityFilter
})
