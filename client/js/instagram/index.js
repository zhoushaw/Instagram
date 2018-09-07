import React from 'react'
import '@scss/base.scss'
import './index.scss'
import Nav from '../components/nav/index.js'
import Detail from './detail/index'
import { BrowserRouter as Router,Route,Switch} from "react-router-dom";

const Intagram = () => {
  return (
    <Router>
      <div>
        <Nav />
        <div className="page-container">
          <Switch>
            <Route exact path="/" component={Detail}/>
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default Intagram