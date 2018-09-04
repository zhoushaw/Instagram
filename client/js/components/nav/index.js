import React from 'react'
import './index.scss'

class Nav extends React.Component{
  constructor(props){
    super(props)
  }
 
  render () {
    return (
      <nav className="page-header">
        <section className="layout">
          <div ref="header" className="header" >
            <div className="logo-space">
              <a className="instagram" v-show="!toggle" href="/"></a>
              <a className="icon"></a>
            </div>
            <div className="search">
              <div className="search-content">
                <input className="search-input" type="text" placeholder="搜索"  v-focus="focusStatus" />
                <span v-show="focusStatus" className="icon"></span>
                <span v-show="focusStatus" className="close active"></span>
              </div>
              <div v-show="!focusStatus" className="search-block" >
                <span className="block-icon"></span>
                <span className="block-text">搜索</span>
              </div>
            </div>
            <div className="navigate">
              <a className="explore" href=""></a>
              <a className="love" href=""></a>
              <a className="user" href=""></a>
            </div>
          </div>
        </section>
      </nav>
    )
  }
}
export default Nav