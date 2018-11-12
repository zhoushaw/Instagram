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
            <li className="active"><Icon className="icon" type="appstore" theme="outlined" />帖子</li>
            <li>IGTV</li>
            <li><Icon className="icon" type="tags" theme="outlined" />收藏夹</li>
          </ul>
          <section className="favorite-container">
            {
                this.state.hasData?
                <div className="descript"></div>
                :
                <div  className="descript">
                    <div className="no-more">
                        <Icon  className="no-more-icon" type="linkedin" />
                        <span className="notice">没有照片</span>
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