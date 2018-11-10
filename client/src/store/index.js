
import { createStore } from 'redux'
import rootReducer from './reducers'

const store = createStore(rootReducer, {
    userInfo: {}
})
export default store