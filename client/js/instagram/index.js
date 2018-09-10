import React from 'react'
import '@scss/base.scss'
import './index.scss'
import Nav from '../components/nav/index.js'
import Detail from './detail/index'
import { BrowserRouter as Router,Route,Switch} from "react-router-dom";
import Login from './login/index.js'
const Intagram = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Detail}/>
        <Route exact path="/login" component={Login}/>
      </div>
    </Router>
  )
}

export default Intagram