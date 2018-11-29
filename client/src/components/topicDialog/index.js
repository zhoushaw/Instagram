import React from 'react'
import Style from './index.scss'
import ReactDOM from 'react-dom'
import Carousel from '@components/carousel'
import Avatar from '@components/avatar'
import Comments from '@components/comments'
import store from '@/src/store'
import { Icon } from 'antd';

let defaultState = {
    alertStatus: false,
    alertTip:"提示",
    closeAlert:function(){},
    userInfo: {
        avatarUrl: '',
        username: null,
        account: '',
        abstract: false,
        email: ''
    },
    topic: {
        index: 0,
        topicImgList: [],
        topicLike: false,
        topicLikeCounts: 20
    },
    discuss: [],
    addComments: () => {}, // 添加评论
    topicLikeFn: () => {} // 点赞
}

class TopicDialog extends React.Component{
    
    state = {
        ...defaultState
    }
 
    // 关闭弹框
    confirm = () => {
        this.setState({
            alertStatus:false
        })
        this.state.closeAlert();
        this.stopBodyScroll(false)
    }

    // 打开弹窗
    open =(options)=>{
        options = options || {};
        options.alertStatus = true;
        this.setState({
          ...defaultState,
          ...options
        })
        this.stopBodyScroll(true)
    }

    stopBodyScroll = (isFixed) => {
        let bodyEl = document.body
        let top = 0

        if (isFixed) {
            top = window.scrollY

            bodyEl.style.position = 'fixed'
            bodyEl.style.top = -top + 'px'
        } else {
            bodyEl.style.position = ''
            bodyEl.style.top = ''
            // window.scrollTo(0, top) // 回到原先的top
        }
    }

    // 修改评论，修改上层数据
    addComments = (...params) => {
        let newDiscuss = [...this.state.discuss, ...params]
        this.setState({
            discuss: newDiscuss
        })
        this.state.addComments(...params)
    }

    // 改变dialog数据，修改上层数据
    topicLikeFn = (...params) => {
        this.setState({
            topic: Object.assign(
                {}, 
                this.state.topic,
                ...params
            )
        })
        this.state.topicLikeFn(...params)
    }

    render () {
        let avatarStyle = {
            width: '40px',
            height: '40px'
        }
        let {topic, topicIndex} = this.state
        return (
            <section className={Style['topic-dialog']} style={this.state.alertStatus? {display:'block'}:{display:'none'}}>
                <div className="container">
                    <Icon type="close" className="close-btn" onClick={this.confirm} />
                    <article className="topic">
                        <div className="carousel">
                            <Carousel imageList={topic.topicImgList} showSlickDot={false}/>
                        </div>
                        <div className="comment">
                            <header>
                                <Avatar userInfo={this.state.userInfo} avatarStyle={avatarStyle}/>
                            </header>

                            {/* 评论区 */}
                            <Comments 
                                topicLikeFn={this.topicLikeFn}
                                addComments={this.addComments}
                                createdAt={topic.created_at}
                                store={store}
                                topicIndex={topicIndex}
                                discuss={this.state.discuss} 
                                topicId={topic.topicId} 
                                topicLike={topic.topicLike}
                                dialog={true}
                                dotCounts={topic.topicLikeCounts}>
                            </Comments>
                        </div>
                    </article>
                </div>
            </section>
        )
    }

}

let div = document.createElement('div');
document.body.appendChild(div);
 
let Box = ReactDOM.render(React.createElement(
    TopicDialog
),div);
 
export default Box;　
