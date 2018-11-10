import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import Instagram from './src/pages/index.js'
import store from './src/store'

ReactDOM.render(
  <Provider store={store}>
    <Instagram />
  </Provider>, 
  document.getElementById("app")
);