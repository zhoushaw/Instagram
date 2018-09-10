import React from 'react'
import Style from './index.scss'

class DynamicList extends React.Component {
  constructor(props){
    super(props);
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