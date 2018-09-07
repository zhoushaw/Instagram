import React from 'react'
import Style from './index.scss'

class DynamicList extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className={Style['dynamic-list']}>
        <article class="article">
          <header className="header">
            <div className="avatar"></div>
            <div className="user_abstract">
              <p className="username"></p>
              <p className="abstract"></p>
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