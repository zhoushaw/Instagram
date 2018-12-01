import { BrowserRouter as Router,Switch,Route} from "react-router-dom";
import React from 'react'
import API from '@common/api.js'
import '@scss/base.scss'
import './index.scss'

// 页面
import Login from './login/index.js'
import Detail from './detail/index'
import About from './about/index'
import NotFoundPage from './404/index'
import Accounts from './accounts'
import Search from './search'
import { connect } from "react-redux";


@connect(
    store => {
        return {
            userInfo: store.userInfo
        }
    }
)
class Intagram extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Detail}/>
                    <Route path="/login" component={Login} />
                    <Route path="/about/:userId" component={About} />
                    <Route path="/about" component={About} />
                    <Route path="/accounts" component={Accounts}/>
                    <Route path="/search/:content" component={Search}/>
                    <Route path="/search" component={Search}/>
                    <Route component={NotFoundPage} />
                </Switch>
            </Router>
        )
    }
}
export default Intagram
