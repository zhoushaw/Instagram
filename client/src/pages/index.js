import { BrowserRouter as Router,Switch,Route,Redirect} from "react-router-dom";
import React from 'react'
import Login from './login/index.js'
import Detail from './detail/index'
import About from './about/index'
import NotFoundPage from './404/index'
import '@scss/base.scss'
import './index.scss'

class Intagram extends React.Component {

    render() {
        return (
          <Router>
            <Switch>
              <Route exact path="/" component={Detail}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/about" component={About}/>
              <Route exact path = '*' component={NotFoundPage} />
            </Switch>
          </Router>
        )
    }
}

export default Intagram
