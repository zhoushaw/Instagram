import React from 'react'
import Style from './index.scss'

class DynamicList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      friend_list: [
        {
          userInfo: {
            avatar: 'https://scontent-nrt1-1.cdninstagram.com/vp/411304988011e5a322e837c6d44b5b35/5C2DA515/t51.2885-19/s320x320/33885471_1992324384411933_7383797600782123008_n.jpg',
            username: 'codingzx',
            abstract: 'life is great'
          }
        }
      ],
    }
  }

  render() {
    return (
      <div className={Style['dynamic-list']}>
        <article className="article">
          <header className="header">
            <div className="avatar"></div>
            <div className="user_abstract">
              <div className="username"></div>
              <div className="abstract"></div>
            </div>
          </header>
          <div className="container">
          </div>
        </article>
      </div>
    )
  }
}
export default DynamicList