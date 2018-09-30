import React from 'react'
import { Icon } from 'antd';
import Style from './index.scss'

class UserInfos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountName: 'codingzx',
      postAmount: 20,
      fans: 20,
      attentionAmount: 100,
      userName: '周晓'
    }
  }

  render() {
    return (
      <main>
        <div className={Style['user-infos']}>
          <div className="avator"></div>
          <div className="user-infos">
            <p className="operate">
              <span className="user-account">{this.state.accountName}</span>
              <span className="modify">编辑个人主页</span>
              <Icon className="icon" type="setting" theme="filled" />
            </p>
            <p className="attention-status">
              <span><b>{this.state.postAmount}</b>帖子</span>
              <span><b>{this.state.fans}</b>粉丝</span>
              <span><b>正在关注</b>{this.state.attentionAmount}</span>
            </p>
            <p className="user-name">
              <b>{this.state.userName}</b>
            </p>
          </div>     
        </div>
      </main>
    )
  }
}

export default UserInfos