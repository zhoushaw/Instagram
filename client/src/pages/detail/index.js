import React from 'react'
import DynamicList from './components/dynamic-list'
import Recommend from './components/recommend'
import AttentionList from './components/attention-list'
import Nav from '@components/nav/index.js'
import Style from './index.scss'
import API from '@common/api.js'
import update from 'react-addons-update'; // ES6

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasTopic: true,
            followList: []
        }
        this.initBaseData()
    }

    async initBaseData() {
        let response = await API.friendList()
        response.data.forEach((item) => {
            item.hasFollow = false
        })
        this.setState({
            followList: response.data
        })
    }


    setFollowStatus = async (index, status) => {
        let followList = this.state.followList;
        await API.followUser({
            userId: followList[index].userId,
            status
        })

        this.setState({
            followList: update(this.state.followList, { 
                [index]: { 
                    hasFollow:  { $set: status} 
                } 
            })
        })
    }

    noTopic =  (status) => {
        this.setState({
            hasTopic: status
        })
    }

    render() {
        return (
            <main>
                <Nav />
                <div className="page-container">
                    <span className="loading"></span>
                        {
                            this.state.hasTopic?
                            <div className={Style['home-detail']}>
                                <DynamicList noTopic={this.noTopic}/>
                                <Recommend />
                            </div>
                            :
                            <AttentionList followList={this.state.followList} setFollowStatus={this.setFollowStatus}/>
                        }
                </div>
            </main>
        )
    }
}

export default Detail