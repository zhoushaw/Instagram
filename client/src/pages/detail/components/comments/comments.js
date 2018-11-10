import React from 'react'
import Style from './comments.scss'
import API from '@common/api.js'
import { notification } from 'antd';


class Comments extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            dotCounts: 2,
            replyContent: '',
            selfLove: false,
            topicLike: props.topicLike
        }
        this._handleKeyPress = this._handleKeyPress.bind(this)
    }

    handelChange (event){
        this.setState({replyContent:event.target.value})
    }

    // 点赞
    async topicLike() {
        let response = await API.topicLike({ topicId: this.props.topicId, status: this.state.topicLike? 0 : 1 })

        // 确定点赞数，status: 1点赞，0取消
        let dotCounts;
        if (response.data.status){
            dotCounts = ++this.state.dotCounts
        } else {
            dotCounts = this.state.dotCounts - 1 >= 0 ? this.state.dotCounts - 1 : 0
        }
        this.setState({
            dotCounts,
            topicLike: !!response.data.status
        })
    }

    // 添加评论
    async _handleKeyPress (event) {
        if (event.key === 'Enter') {
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
                        <span className={`favorite  ${this.state.topicLike && 'active'}`} onClick={this.topicLike.bind(this)}></span>
                        <span className="comments"></span>
                    </div>
                    <span className="fl-right collect"></span>
                </div>
                <div className="dot-counts u-f-black">{this.state.dotCounts}次赞</div>
                <ul className="comments-list">
                    { 
                        this.props.discuss.map((item,index) => {
                            return (
                                <li className="content" key={index}>
                                    <span className="username  u-f-black">{item.replyName}</span>
                                    <span className="replay-content u-f-black-blod">{item.replyContent}</span>
                                </li>
                            )
                        })
                    }
                </ul>
                <div className="release-time u-f-lightblack2">3天前</div>
                <div className="add-comments">
                    <input type="text" 
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
