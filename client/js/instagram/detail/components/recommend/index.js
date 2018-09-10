import React from 'react'
import Style from './index.scss'

class Recommend extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      
    }
  }

  render () {
    let friend_list = ['','','','','']

    return (
      <div className={Style.recommend}>
        <header className="header">
          <div className="avatar"></div>
          <div className="user_abstract">
            <div className="username"></div>
            <div className="abstract"></div>
          </div>
        </header>
        <section className="container">
          <nav className="title">快拍</nav>
          <ul className="friend_photo">
            {
              friend_list.map((item, index)=>{
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