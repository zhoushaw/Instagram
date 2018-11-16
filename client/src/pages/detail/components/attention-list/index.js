import React from 'react'
import Style from './index.scss'
import Avatar from '@components/avatar'
import { connect } from "react-redux";
import { withRouter } from 'react-router'
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

export default withRouter(AttenTionList)