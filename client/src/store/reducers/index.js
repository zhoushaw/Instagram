import { combineReducers } from 'redux'
import userInfo from './userInfo'
import topicList from './topicList'
import personalInfo from './personalInfo'
import searchInfo from './searchInfo'
export default combineReducers({
    userInfo,
    topicList,
    personalInfo,
    searchInfo
})
