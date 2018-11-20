import { combineReducers } from 'redux'
import userInfo from './userInfo'
import topicList from './topicList'
export default combineReducers({
    userInfo,
    topicList
})
