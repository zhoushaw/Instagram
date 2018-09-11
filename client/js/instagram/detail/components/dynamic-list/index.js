import React from 'react'
import Style from './index.scss'

class DynamicList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      dynamicList: [
        {
          userInfo: {
            avatar: 'https://scontent-nrt1-1.cdninstagram.com/vp/411304988011e5a322e837c6d44b5b35/5C2DA515/t51.2885-19/s320x320/33885471_1992324384411933_7383797600782123008_n.jpg',
            username: 'codingzx',
            abstract: 'life is great'
          },
          imagList: [
            'https://scontent-sit4-1.cdninstagram.com/vp/516f31d8340a4a897b578bacd551a734/5C303C28/t51.2885-15/e35/40426112_159256018310402_4973568210772759512_n.jpg'
          ]
        },
        {
          userInfo: {
            avatar: 'https://scontent-sit4-1.cdninstagram.com/vp/f4f32317694a66123c6082dfa49be204/5C22525E/t51.2885-19/s150x150/35000476_1933742596676449_6448191077596790784_n.jpg',
            username: 'kagoyuta',
            abstract: 'life is great'
          },
          imagList: [
            'https://scontent-sit4-1.cdninstagram.com/vp/516f31d8340a4a897b578bacd551a734/5C303C28/t51.2885-15/e35/40426112_159256018310402_4973568210772759512_n.jpg'
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