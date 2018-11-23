import React from 'react'
import DynamicList from './components/dynamic-list'
import PostTopic from './components/post-topic'
import Recommend from './components/recommend'
import AttentionList from './components/attention-list'
import Nav from '@components/nav/index.js'
import Style from './index.scss'
import API from '@common/api.js'
import update from 'react-addons-update'; // ES6
import { connect } from "react-redux";


@connect(
    store => {
        return {
            topicList: store.topicList
        }
    },
    dispatch => {
        return {
            addTopicList: info => {
                dispatch({
                    type: 'ADD_TOPICLIST',
                    info: info
                })
            }
        };
    }
)
class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasTopic: true,
            followList: [],
            showAttentionList: false,
            showPostTopic: false
        }
        this.initFriendList()
        this.initTopicList()
    }


    async initFriendList() {
        let response = await API.friendList()

        let followList = response.data.map((item) => {
            item.hasFollow = false
            return item
        });
        this.setState({
            followList
        })

    }

    async initTopicList () {
        // 获取用户帖子列表
        let topicResponse = await API.frientTopicList()
        this.props.addTopicList(topicResponse.data)
    }

    setFollowStatus = async (index, status) => {
        let followList = this.state.followList;
        await API.followUser({
            userId: followList[index].userId,
            status: status? 1 : 0
        })

        this.setState({
            followList: update(this.state.followList, { 
                [index]: { 
                    hasFollow:  { $set: status} 
                } 
            })
        })
    }


    togglePostTopic = (refresh) => {
        this.setState({
            showPostTopic: !this.state.showPostTopic
        })
        
        // 刷新数据
        if (refresh) {
            this.initTopicList()
        }
    }

    render() {
        return (
            <main>
                <Nav />
                {
                    this.state.showPostTopic?
                    <PostTopic togglePostTopic={this.togglePostTopic} />
                    : ''
                }
                <div className="page-container">
                    <span className="loading"></span>
                        {
                            !this.state.showAttentionList && this.props.topicList.length > 0?
                            <div className={Style['home-detail']}>
                                <DynamicList/>
                                <Recommend togglePostTopic={this.togglePostTopic}  followList={this.state.followList} setFollowStatus={this.setFollowStatus}/>
                            </div>
                            :
                            <div className={Style['home-detail']}>
                                <AttentionList followList={this.state.followList} setFollowStatus={this.setFollowStatus} />
                                {
                                    this.state.followList.length === 0?
                                        <Recommend togglePostTopic={this.togglePostTopic} followList={this.state.followList} setFollowStatus={this.setFollowStatus} />
                                        : ''
                                }
                            </div>
                        }
                </div>
            </main>
        )
    }
}

export default Detail