import React from 'react'
import '@scss/base.scss'
import './index.scss'
import Nav from '../components/nav/index.js'
import { BrowserRouter as Router,Route,Switch} from "react-router-dom";
import Detail from './detail/index'


const Intagram = () => {
  return (
    <div>
      <Nav />
      <Route path="/detail" component={Detail}/>
    </div>
  )
}

export default Intagram