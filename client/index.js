import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './src/store/reducers'
import Instagram from './src/pages/index.js'

const store = createStore(rootReducer, {
    userInfo: {}
})

ReactDOM.render(
  <Provider store={store}>
    <Instagram />
  </Provider>, 
  document.getElementById("app")
);