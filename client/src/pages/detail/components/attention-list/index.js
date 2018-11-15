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
        userList: []
    }
    
    async initBaseData () {
        let response = await API.friendList()
        this.setState({
            userList: response.data
        })
    }
    

    render () {
        let avatarStyle = {
            'width': '44px',
            'height': '44px'
        }
        return (
            <div className={`${Style['attention-list']}`}>
                <div className="title">推荐</div>
                <ul className="list">
                    {
                        this.state.userList.map((item, index) => {
                            return (<li key={index}>
                                <Avatar userInfo={item} avatarStyle={avatarStyle}/>
                                <Button type="primary">关注</Button>
                                <Button>已关注</Button>
                            </li>)
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default withRouter(AttenTionList)