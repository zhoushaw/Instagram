import React from 'react'
import { Icon } from 'antd';
import Style from './index.scss'
import { withRouter } from 'react-router'
import API from '@common/api.js'

class UserInfos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topicCounts: 0,
            fansCounts: 20,
            followCounts: 100,
            avator: ''
        }
    }

    goEditAccounts = () => {
        const { history } = this.props;
        history.push('/accounts')
    }

    attentionUser = async () => {

        await API.followUser({
            userId: this.props.userInfo.userId,
            status: !this.props.hasFollow ? 1 : 0
        })

        this.props.toggleFollowStatus()
    }


    render() {
        let {userInfo} = this.props
        return (
            <main>
                <div className={Style['user-infos']}>
                    <div className="avator" style={{ 'backgroundImage': `url(${userInfo.avatarUrl})`}}></div>
                    <div className="user-infos">

                    {
                        this.props.isSelf?
                        <p className="operate">
                            <span className="user-account">{userInfo.username}</span>
                            <span className="modify" onClick={this.goEditAccounts}>编辑个人主页</span>
                            <Icon className="icon" type="setting" theme="filled"  onClick={this.goEditAccounts}/>
                        </p>
                        :
                        <p className="operate">
                            <span className="user-account">{userInfo.username}</span>
                            <span className={`modify ${!this.props.hasFollow && 'blue'}`} onClick={this.attentionUser}>
                                {this.props.hasFollow?'已关注': '关注'}
                            </span>
                        </p>
                    }

                    <p className="attention-status">
                        <span><b>{this.props.personalInfo.topicCounts}</b>帖子</span>
                        <span><b>{this.props.personalInfo.fansCounts}</b>粉丝</span>
                        <span><b>正在关注</b>{this.props.personalInfo.followCounts}</span>
                    </p>
                    <p className="user-name">
                        <b>{userInfo.abstract}</b>
                    </p>
                    </div>     
                </div>
            </main>
        )
    }
}

export default withRouter(UserInfos)