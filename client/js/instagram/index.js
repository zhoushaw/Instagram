import React from 'react'
import '@scss/base.scss'
import './index.scss'
import Nav from '../components/nav/index.js'
import { Route } from "react-router-dom";
import Detail from './detail/index'


const Intagram = () => {
  return (
    <div>
      <Nav />
      <div className="page-container">
        <Detail />
      </div>
    </div>
  )
}

export default Intagram