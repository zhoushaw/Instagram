import React from 'react'
import Style from './comments.scss'
import API from '@common/api.js'
import { notification } from 'antd';


class Comments extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            replyContent: '',
            selfLove: false,
            topicLike: props.topicLike,
            showMoreComments: false
        }
        this._handleKeyPress = this._handleKeyPress.bind(this)
    }

    handelChange (event){
        this.setState({replyContent:event.target.value})
    }

    __showMoreComments () {
        this.setState({
            showMoreComments: true
        })
    }


    // 聚焦
    focus () {
        this.refs.textInput.focus();
    }

    // 点赞
    async topicLike() {
        let response = await API.topicLike({ topicId: this.props.topicId, status: this.props.topicLike? 0 : 1 })

        // 确定点赞数，status: 1点赞，0取消
        let dotCounts;
        if (response.data.status){
            dotCounts = this.props.dotCounts + 1;
        } else {
            dotCounts = this.props.dotCounts - 1 >= 0 ? this.props.dotCounts - 1 : 0;
        }
        this.props.topicLikeFn(dotCounts, response.data.status === 1)
    }

    // 添加评论
    async _handleKeyPress (event) {
        if (event.key === 'Enter') {
            if (!this.state.replyContent) {
                notification['error']({
                    message: '请输入评论内容'
                })
                return
            }

            let response = await API.addDiscuss({topicId: this.props.topicId,replyContent: this.state.replyContent})
			notification['success']({
				message: response.message
            })
            
            // 向父组件通信，添加评论
            this.props.addComments(
                this.state.replyContent
            )

            // 清空评论
            this.setState({
                replyContent: ''
            })
        }
    }

    render () {

        return (
            <div className={Style['comments-section']}>
                <div className="opetions">
                    <div className="fl-left">
                        <span className={`favorite  ${this.props.topicLike && 'active'}`} onClick={this.topicLike.bind(this)}></span>
                        <span className="comments" onClick={this.focus.bind(this)}></span>
                    </div>
                    <span className="fl-right collect"></span>
                </div>
                <div className="dot-counts u-f-black">{this.props.dotCounts}次赞</div>
                <ul className="comments-list">
                    { 
                        this.props.discuss.map((item,index) => {
                            if (index!==3) {
                                return (
                                    <li className={`content ${index > 3 && 'hidden'} ${this.state.showMoreComments && 'no-hidden'}`} key={index}>
                                        <span className="username  u-f-black">{item.replyName}</span>
                                        <span className="replay-content u-f-black-blod">{item.replyContent}</span>
                                    </li>
                                )
                            }  else {
                                // 显示所有部分内容
                                return (
                                    <div key={index}>
                                        <li className={`content ${this.state.showMoreComments && 'no-hidden'}`} >
                                            <span className="username  u-f-black">{item.replyName}</span>
                                            <span className="replay-content u-f-black-blod">{item.replyContent}</span>
                                        </li>
                                        {
                                            this.props.discuss.length > 4?
                                             <li className={`content show-more u-f-lightblack2 ${this.state.showMoreComments && 'hidden'}`}>
                                                <span onClick={this.__showMoreComments.bind(this)}>显示所有</span>
                                            </li>
                                            : ''
                                        }
                                    </div>
                                )
                            }
                        })
                    }
                </ul>
                <div className="release-time u-f-lightblack2">3天前</div>
                <div className="add-comments">
                    <input type="text" 
                        ref="textInput"
                        className="u-f-black"
                        placeholder="添加评论..." 
                        onChange={this.handelChange.bind(this)} 
                        value={this.state.replyContent} 
                        onKeyPress={this._handleKeyPress}/>
                    <span className="more"></span>
                </div>
            </div>
        )
    }
}

export default Comments
