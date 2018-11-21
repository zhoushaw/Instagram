import { combineReducers } from 'redux'
import userInfo from './userInfo'
import topicList from './topicList'
import personalInfo from './personalInfo'
export default combineReducers({
    userInfo,
    topicList,
    personalInfo
})
