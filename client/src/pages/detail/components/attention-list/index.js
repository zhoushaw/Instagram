import React from 'react'
import Style from './index.scss'
import Avatar from '@components/avatar'
import { connect } from "react-redux";
import { Button } from 'antd';

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
    }
    
    render () {
        const { followList} = this.props
        let avatarStyle = {
            'width': '44px',
            'height': '44px'
        }

        return (
            <div className={`${Style['attention-list']}`}>
                <div className="title">推荐</div>
                <ul className="list">
                    {
                        followList.length === 0?
                        <li>天啊噜，目前居然没有可关注的人，快来成为第一个发帖人吧</li>
                        :
                        followList.map((item, index) => {
                            return (
                                <li key={index}>
                                    <Avatar userInfo={item} avatarStyle={avatarStyle} />
                                    {
                                        item.hasFollow
                                            ? <Button onClick={() => { this.props.setFollowStatus(index, false) }}>已关注</Button>
                                            : <Button type="primary" onClick={() => {this.props.setFollowStatus(index, true)}}>关注</Button>
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

export default AttenTionList