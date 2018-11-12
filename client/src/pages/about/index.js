import React from 'react'
import Style from './index.scss'
import Nav from '../../components/nav/index.js'
import UserInfos from './components/userInfos/index.js'
import FavoriteList from './components/favoriteList/index.js'
import API from '@common/api'

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topic: {
                counts: 0,
                topicList: []
            },
            fansCounts: 0,
            followCounts: 0,
        }
        this.initData()
    }

    initData() {
        // 获取帖子、粉丝
        API.getPersonalInfo().then(response => {
            let { topic, fansCounts, followCounts } = response.data
            this.setState({
                topic,
                fansCounts,
                followCounts
            })
        })
    }  
  render() {
    return (
      <main>
        <Nav />
        <div className="page-container">
          <div className={Style['personal-about']}>
            <UserInfos personalInfo={
                    {
                        topicCounts: this.state.topic.counts,
                        fansCounts: this.state.fansCounts,
                        followCounts: this.state.followCounts
                    }
                } />
                <FavoriteList topicList={this.state.topic.topicList}/>
          </div>
        </div>
      </main>
    )
  }
}

export default Detail