import React from 'react'
import DynamicList from './components/dynamic-list/index'
import Recommend from './components/recommend/index'
import Style from './index.scss'

class Detail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={Style['home-detail']}>
        <DynamicList />
        <Recommend />
      </div>
    )
  }
}

export default Detail