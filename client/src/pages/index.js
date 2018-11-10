import { BrowserRouter as Router,Switch,Route,Redirect} from "react-router-dom";
import API from '@common/api.js'
import React from 'react'
import store from '@/src/store'
import Login from './login/index.js'
import Detail from './detail/index'
import About from './about/index'
import NotFoundPage from './404/index'
import '@scss/base.scss'
import './index.scss'

class Intagram extends React.Component {

    componentDidMount() {
        // API.getUserInfo().then(response => {
        //     store.dispatch({
        //         type: 'ADD_USERINFO', 
        //         info: response.data
        //     })
        //     console.log(store.getState())
        // })
    }

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
