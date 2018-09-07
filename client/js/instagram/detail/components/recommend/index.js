import React from 'react'
import Style from './index.scss'

class Recommend extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      
    }
  }

  render () {
    return (
      <div className={Style.recommend}>
        <header className="header">
          <div className="avatar"></div>
          <div className="user_abstract">
            <p className="username"></p>
            <p className="abstract"></p>
          </div>
        </header>
        <section className="container">
          <nav className="title">快拍</nav>
          <ul className="friend_photo">
            <li className="list">
              <div className="avatar"></div>
              <div className="user_abstract">
                <p className="username"></p>
                <p className="abstract"></p>
              </div>
            </li>
            <li className="list">
              <div className="avatar"></div>
              <div className="user_abstract">
                <p className="username"></p>
                <p className="abstract"></p>
              </div>
            </li>
            <li className="list">
              <div className="avatar"></div>
              <div className="user_abstract">
                <p className="username"></p>
                <p className="abstract"></p>
              </div>
            </li>
            <li className="list">
              <div className="avatar"></div>
              <div className="user_abstract">
                <p className="username"></p>
                <p className="abstract"></p>
              </div>
            </li>
            <li className="list">
              <div className="avatar"></div>
              <div className="user_abstract">
                <p className="username"></p>
                <p className="abstract"></p>
              </div>
            </li>
          </ul>
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