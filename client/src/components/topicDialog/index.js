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
        topicImgList: ["http://img1.3lian.com/img013/v4/96/d/41.jpg"],
        topicLike: false,
        topicLikeCounts: 20
    },
    discuss: [
        {
            replyContent: "我的天",
            replyName: "shwazhou",
            userId: "3c1c52769881489aa6a05f36e415d0da"
        }
    ]
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
        console.log(options)
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

    render () {
        let avatarStyle = {
            width: '40px',
            height: '40px'
        }
        let {topic} = this.state
        return (
            <section className={Style['topic-dialog']} style={this.state.alertStatus? {display:'block'}:{display:'none'}}>
                <div className="container">
                    <Icon type="close" className="close-btn" onClick={this.confirm} />
                    <article className="topic cl-float">
                        <div className="carousel fl-left">
                            <Carousel imageList={topic.topicImgList} showSlickDot={false}/>
                        </div>
                        <div className="comment fl-right">
                            <header>
                                <Avatar userInfo={this.state.userInfo} avatarStyle={avatarStyle}/>
                            </header>

                            {/* 评论区 */}
                            <Comments 
                                store={store}
                                topicIndex={topic.index}
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
