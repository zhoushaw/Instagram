import React from 'react'
import Style from './index.scss'
import Nav from '../../components/nav/index.js'
import UserInfos from './components/userInfos/index.js'
import FavoriteList from './components/favoriteList/index.js'

class Detail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main>
        <Nav />
        <div className="page-container">
          <div className={Style['personal-about']}>
            <UserInfos />
            <FavoriteList />
          </div>
        </div>
      </main>
    )
  }
}

export default Detail