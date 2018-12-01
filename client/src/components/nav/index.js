import React from 'react'
import Style from './index.scss'
import {Link} from 'react-router-dom'
import { Menu, Dropdown, notification } from 'antd';
import API from '@common/api'
import { withRouter } from 'react-router'
import PropTypes from "prop-types";
import { connect } from "react-redux";



@connect(
    store => {
        return {
            userInfo: store.userInfo
        }
    },
    dispatch => {
        return {
            addSearchInfo: info => {
                dispatch({
                    type: 'ADD_SEARCH_INFO',
                    info: info
                })
            },
            addUserInfo: info => {
                dispatch({
                    type: 'ADD_USERINFO',
                    info
                })
            }
        };
    }
)
class Nav extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            toggle: true,
            focusStatus: false,
            search: ''
        }
    }
 
    static contextTypes = {
        router: PropTypes.object
    }

    
    render () {
        const aboutMenu = (
            <Menu>
                <Menu.Item>关于我</Menu.Item>
                <Menu.Item onClick={this.signOut.bind(this)}>退出登录</Menu.Item>
            </Menu>
        );


        return (
            <nav className={Style['page-header']}>
                <div ref="header" className={`header ${this.state.toggle?'' : 'toggle'}`} >
                    <div className="logo-space">
                        {
                            this.state.toggle?
                            <Link  className="instagram" to={'/'} />
                            :
                            <Link  className="icon" to={'/'} />
                        }
                    </div>
                    <div className="search">
                    {
                        this.state.focusStatus?
                        <div className="search-content">
                            <input 
                                className="search-input" 
                                type="text" 
                                onKeyPress={this.searchContent}
                                placeholder="搜索" 
                                onChange={this.handelChange.bind(this)} 
                                autoFocus={this.state.focusStatus}  
                                onBlur={this.focusSearchInput.bind(this)} />
                            <span className="icon"></span>
                            {/* <span className="close active"></span> */}
                        </div>
                        : 
                        <div className="search-block" onClick={this.focusSearchInput.bind(this)}>
                            <span className="block-icon"></span>
                            <span className="block-text">搜索</span>
                        </div>
                    }
                    </div>
                    <div className="navigate">
                        <Link  className="explore" to={'/'} />
                        <Link  className="love" to={'/'} />
                        <Dropdown overlay={aboutMenu} >
                            <Link  className="user" to={'/about'}/>
                        </Dropdown>
                    </div>
                </div>
            </nav>
        )
    }

    focusSearchInput () {
        this.setState({'focusStatus': !this.state.focusStatus})
    }

    onScroll = (event) => {
        if(!event.srcElement.scrollingElement){return;}
        let scroll_Y = event.srcElement.scrollingElement.scrollTop;
        this.setState({
            toggle: !(scroll_Y>58)
        })
    }

    searchContent = async (event) => {
        if (event.key === 'Enter') {
            let search = this.state.search
            // 获取用户帖子列表
            let response = await API.searchTopic({ 
                params: {search}
            })
            this.props.addSearchInfo(response.data)
            

            let path = {
                pathname: `/search/${search}`,
                // params: data
            }
            this.context.router.history.push(path)
        }

    }

    handelChange (event){
        this.setState({search: event.target.value})
    }

    async signOut () {
        let response = await API.signout()
        notification['success']({
            message: response.message
        })
        this.props.history.push('/login');
    }

    componentDidMount () {
        // 获取用户基础数据
        if (!this.props.userInfo.userId) {
            API.getUserInfo().then(response => {
                this.props.addUserInfo(response.data)
            })
        }
        window.addEventListener("scroll",this.onScroll)
    }

    componentWillUnmount(){
        window.removeEventListener("scroll",this.onScroll);
    }
}
export default withRouter(Nav)
