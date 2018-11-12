import React from 'react'
import Style from './index.scss'
import API from '@common/api.js'
import Carousel from '@components/carousel'
import Comments from '../comments/comments.js'
import { connect } from 'react-redux'


class DynamicList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      dynamicList: [
        {
          userInfo: {
            avatar: 'https://s10.mogucdn.com/mlcdn/c45406/180930_634a7ck1ikea6k139lbgbi343ha2c_150x150.jpg',
            username: 'loading',
            abstract: 'loading'
          },
          topic: {
            topicImgList: [],
            createdAt: '',
            topicLikeCounts: 0 // 点赞数
          },
          discuss: []
        }
      ],
    }
	this.initBaseData()
  }

    // 初始化朋友圈
    async initBaseData () {
        let response = await API.frientTopicList()
        if (response.data.length > 0) {
            this.setState({
                dynamicList: response.data
            })
        }
    }

    // 新增评论
    addComments(index, replyContent) {
        let targetTopic = this.state.dynamicList[index]
        let replyName = this.props.userInfo.username
        let sourceComment = {
            replyName,
            replyContent
        }
        targetTopic.discuss.push(sourceComment)
    }

    // 点赞
    topicLike(index, dotCounts, topicLike) {
        let targetTopic = this.state.dynamicList[index].topic
        this.setState(Object.assign(
            targetTopic,
            {
                topicLikeCounts: dotCounts,
                topicLike
            }
        ))
    }

  render() {
    return (
      <div className={Style['dynamic-list']}>
        {
          this.state.dynamicList.map((item,index) => {
            return (
              <article className="article" key={index}>
                <header className="header">
                  <div className="avatar"  style={{'backgroundImage': `url(${item.userInfo.avatarUrl}`}}></div>
                  <div className="user_abstract">
                    <div className={`username ${item.userInfo.username&&'clear-bg'}`}>{item.userInfo.username}</div>
                    {/* <div className={`abstract ${item.userInfo.abstract&&'clear-bg'}`}>{item.userInfo.abstract}</div> */}
                  </div>
                </header>
                
                <div className="container">
                    <Carousel imageList={item.topic.topicImgList}></Carousel>
                </div>
                
                {/* 评论区 */}
                <Comments 
                    discuss={item.discuss} 
                    topicId={item.topic.topicId} 
                    topicLike={item.topic.topicLike}
                    dotCounts={item.topic.topicLikeCounts}
                    topicLikeFn={(dotCounts, topicLike) => this.topicLike(index, dotCounts, topicLike)}
                    addComments={(replyContent) => this.addComments(index, replyContent)}>
                </Comments>
              </article>
            )
          })
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
    userInfo: state.userInfo
})

export default connect(
    mapStateToProps
)(DynamicList)