import React from 'react'
import Style from './index.scss'
import Avatar from '@components/avatar'
import { connect } from "react-redux";
import { withRouter } from 'react-router'
import { Button } from 'antd';
import API from '@common/api.js'

@connect(
    store => {
        return {
            userInfo: store.userInfo
        }
    }
)
class AttenTionList extends React.Component {
    constructor(props){
        super(props);
        this.initBaseData()
    }
    state = {
        followList: []
    }
    
    async initBaseData () {
        let response = await API.friendList()
        response.data.forEach((item) => {
            item.hasFollow = false
        })
        this.setState({
            followList: response.data
        })
    }
    
    async setFollowStatus (index, status) {
        let followList = this.state.followList;
        await API.followUser({
            userId: followList[index].userId,
            status
        })
        
        followList[index].hasFollow = status
        this.setState({
            followList
        })
    }
    
    render () {
        const {userInfo} = this.props
        let avatarStyle = {
            'width': '44px',
            'height': '44px'
        }
        return (
            <div className={`${Style['attention-list']}`}>
                <div className="title">推荐</div>
                <ul className="list">
                    {
                        this.state.followList.map((item, index) => {
                            return (
                                <li key={index}>
                                    <Avatar userInfo={userInfo} avatarStyle={avatarStyle}/>
                                    {
                                        item.hasFollow
                                        ? <Button onClick={this.setFollowStatus.bind(this,index, false)}>已关注</Button>
                                        : <Button type="primary"  onClick={this.setFollowStatus.bind(this,index, true)}>关注</Button>
                                    }
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default withRouter(AttenTionList)