import React from 'react'
import DynamicList from './components/dynamic-list/index'
import Recommend from './components/recommend/index'
import Nav from '@components/nav/index.js'
import Style from './index.scss'
import store from '@/src/store'
import API from '@common/api.js'

class Detail extends React.Component {
    constructor(props) {
        super(props);
        API.getUserInfo().then(response => {
            store.dispatch({
                type: 'ADD_USERINFO',
                info: response.data
            })
        })
    }

    render() {
        return (
            <main>
            <Nav />
            <div className="page-container">
                <div className={Style['home-detail']}>
                <span className="loading"></span>
                <DynamicList />
                <Recommend />
                </div>
            </div>
            </main>
        )
    }
}

export default Detail