import React from 'react'
import Style from './index.scss'
import API from '@common/api.js'
import Carousel from '@components/carousel'
import {defaultAvatarUrl} from '@common/staticVariate.js'

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
          topic: {
            topicImgList: [],
            createdAt: ''
          }
        }
      ],
	}
	this.initBaseData()
  }

  async initBaseData () {
    let response = await API.frientTopicList()
    console.log(response)
    this.setState({
      dynamicList: response.data
    })
  }

  
  next() {
    this.slider.slickNext();
  }

  previous() {
    this.slider.slickPrev();
  }

  render() {
    return (
      <div className={Style['dynamic-list']}>
        {
          this.state.dynamicList.map((item,index) => {
            return (
              <article className="article" key={index}>
                <header className="header">
                  <div className="avatar"  style={{'backgroundImage': `url(${item.userInfo.avatarUrl || defaultAvatarUrl}`}}></div>
                  <div className="user_abstract">
                    <div className={`username ${item.userInfo.username&&'clear-bg'}`}>{item.userInfo.username}</div>
                    {/* <div className={`abstract ${item.userInfo.abstract&&'clear-bg'}`}>{item.userInfo.abstract}</div> */}
                  </div>
                </header>
                
                <div className="container">
                    <Carousel imageList={item.topic.topicImgList}></Carousel>
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