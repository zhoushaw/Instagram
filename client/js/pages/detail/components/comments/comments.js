import React from 'react'
import Style from './comments.scss'
class Comments extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        dotCounts: 2
    }
  }

  initData () {
    this.setState({})
  }

  render () {

    return (
        <div className={Style['comments-section']}>
            <div className="opetions">
                <div className="fl-left">
                    <span className="favorite"></span>
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
                                <span>{item.replyContent}</span>
                            </li>
                        )
                    })
                }
            </ul>
            <div className="release-time">3天前</div>
            <div className="add-comments"></div>
        </div>
    )
  }
}

export default Comments
