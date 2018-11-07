import { BrowserRouter as Router,Switch,Route,Redirect} from "react-router-dom";
import { connect } from 'react-redux'
import React from 'react'
import Login from './login/index.js'
import Detail from './detail/index'
import About from './about/index'
import NotFoundPage from './404/index'
import '@scss/base.scss'
import './index.scss'

class Intagram extends React.Component {

    componentDidMount() {
        console.log(this.props)
        this.props.addUserInfo({
            username: 'shawzhou',

        })
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

const mapStateToProps = state => ({
    userInfo: state.userInfo
})
const mapDispatchToProps = dispatch => ({
  addUserInfo: info => dispatch(addUserInfo(info))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Intagram)
