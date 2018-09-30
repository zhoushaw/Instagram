import React from 'react'
import Style from './index.scss'

class DynamicList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      dynamicList: [
        {
          userInfo: {
            avatar: 'https://s10.mogucdn.com/mlcdn/c45406/180930_634a7ck1ikea6k139lbgbi343ha2c_150x150.jpg',
            username: 'codingzx',
            abstract: 'life is great'
          },
          imagList: [
            'https://s10.mogucdn.com/mlcdn/c45406/180930_34f03e7j4jkdbc9671jjc37ghf08c_1080x1080.jpg'
          ]
        },
        {
          userInfo: {
            avatar: 'https://s10.mogucdn.com/mlcdn/c45406/180930_634a7ck1ikea6k139lbgbi343ha2c_150x150.jpg',
            username: 'kagoyuta',
            abstract: 'life is great'
          },
          imagList: [
            'https://s10.mogucdn.com/mlcdn/c45406/180930_34f03e7j4jkdbc9671jjc37ghf08c_1080x1080.jpg'
          ]
        }
      ],
    }
  }

  render() {
    return (
      <div className={Style['dynamic-list']}>
        {
          this.state.dynamicList.map((item,index) => {
            return (
              <article className="article" key={index}>
                <header className="header">
                  <div className="avatar"  style={{'backgroundImage': `url(${item.userInfo.avatar}`}}></div>
                  <div className="user_abstract">
                    <div className={`username ${item.userInfo.username&&'clear-bg'}`}>{item.userInfo.username}</div>
                    {/* <div className={`abstract ${item.userInfo.abstract&&'clear-bg'}`}>{item.userInfo.abstract}</div> */}
                  </div>
                </header>
                <div className="container" style={{'backgroundImage': `url(${item.imagList[0]}`}}>
                </div>
              </article>
            )
          })
        }
      </div>
    )
  }
}
export default DynamicList