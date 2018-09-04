import React from 'react'
import '@scss/base.scss'
import './index.scss'
import Nav from '../components/nav/index.js'

class Intagram extends React.Component{
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div>
        <Nav />
      </div>
    )
  }
}
export default Intagram