import React from 'react'
import { Icon } from 'antd';
import Style from './index.scss'
import store from '@/src/store'
import API from '@common/api'

class UserInfos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {
                avatarUrl: '',
                username: 'loading',
                abstract: 'loading'
            },
            topicCounts: 20,
            fansCounts: 20,
            followCounts: 100,
            avator: ''
        }
        this.initData()
    }

    initData () {
        // 获取store数据，获取userInfo
        store.subscribe(() =>{
            let userInfo = store.getState().userInfo
            // 处理邮箱号
            let email = userInfo.email
            userInfo.email = email.replace(/@.*/, '')

            this.setState({
                userInfo
            })
        });

        // 获取帖子、粉丝
        API.getPersonalInfo().then(response => {
            this.setState(Object.assign(
                this.state,
                response.data
            ))
        })
    }   

    render() {
        return (
            <main>
                <div className={Style['user-infos']}>
                    <div className="avator" style={{'backgroundImage': `url(${this.state.userInfo.avatarUrl})`}}></div>
                    <div className="user-infos">
                    <p className="operate">
                        <span className="user-account">{this.state.userInfo.email}</span>
                        <span className="modify">编辑个人主页</span>
                        <Icon className="icon" type="setting" theme="filled" />
                    </p>
                    <p className="attention-status">
                        <span><b>{this.state.topicCounts}</b>帖子</span>
                        <span><b>{this.state.fansCounts}</b>粉丝</span>
                        <span><b>正在关注</b>{this.state.followCounts}</span>
                    </p>
                    <p className="user-name">
                        <b>{this.state.userInfo.username}</b>
                    </p>
                    </div>     
                </div>
            </main>
        )
    }
}

export default UserInfos