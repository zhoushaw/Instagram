import React from 'react'
import { Icon } from 'antd';
import Style from './index.scss'

class FavoriteList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasData: false
    }
  }

  render() {
    return (
      <main>
        <div className={Style['favorite-list']}>
          <ul className="favorite-nav">
            <li className="active"><i className="topic"></i>帖子</li>
            <li><i className="collect"></i>收藏夹</li>
          </ul>
          <section className="favorite-container">
            {
                this.props.topicList.length >0 ?
                <div className="descript">
                    <ul className="topic-list">
                        {
                            this.props.topicList.map((item) => {
                                return (
                                    <li className="topic" key={item.topic.topicId}>
                                        <img src={item.topic.topicImgList[0]} height="293px"  width="293px"/>
                                        <div className="abstract">
                                            {
                                                item.discuss.length > 0 ?
                                                    <span className="comments"><i className="icon"></i>{item.discuss.length}</span>
                                                    :
                                                    ""
                                            }
                                            {
                                                item.topic.topicLikeCounts> 0?
                                                <span className="favorite"><i className="icon"></i>{item.topic.topicLikeCounts}</span>
                                                : 
                                                ""
                                            }
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                :
                <div  className="descript">
                    <div className="no-more">
                        <Icon  className="no-more-icon" type="linkedin" />
                        <span className="notice">没有帖子</span>
                    </div>
                </div>
            }
          </section>
        </div>
      </main>
    )
  }
}

export default FavoriteList