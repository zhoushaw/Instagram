import React from 'react'
import Style from './index.scss'

class Recommend extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      friend_list: ['', '', '', '', ''],
      userInfo: {
        avatar: 'https://scontent-nrt1-1.cdninstagram.com/vp/411304988011e5a322e837c6d44b5b35/5C2DA515/t51.2885-19/s320x320/33885471_1992324384411933_7383797600782123008_n.jpg',
        username: 'codingzx',
        abstract: 'life is great'
      }
    }
  }

  initData () {
    this.setState({
      friend_list: []
    })
  }

  componentDidMount () {
    this.initData()
  }

  render () {

    return (
      <div className={Style.recommend}>
        <header className="header">
          <div className = "avatar" style = {{ 'backgroundImage': `url(${this.state.userInfo.avatar})`}}></div>
          <div className="user_abstract">
            <div className={`username ${this.state.userInfo.username&&'clear-bg'}`}>{this.state.userInfo.username}</div>
            <div className={`abstract ${this.state.userInfo.abstract&&'clear-bg'}`}>{this.state.userInfo.abstract}</div>
          </div>
        </header>
        <section className="container">
          <nav className="title">快拍</nav>
          {
            this.state.friend_list.length === 0
            ?<p className="notice">你的关注对象动态会显示在这里哦</p>
            :<ul className="friend_photo">
              {
                this.state.friend_list.map((item, index)=>{
                  return (
                    <li className="list" key={index}>
                      <div className="avatar"></div>
                      <div className="user_abstract">
                        <div className="username"></div>
                        <div className="abstract"></div>
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          }
        </section>
        <section className="introduce">
          <p>关于我们·支持·新闻中心·API·工作·隐私·条款·目录·个人主页·话题标签·语言</p>
          <p className="brand">@ 2018 shawzhou</p>
        </section>
      </div>
    )
  }
}

export default Recommend