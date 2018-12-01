import React from 'react'
import Style from './index.scss'
import Nav from '../../components/nav/index.js'
import TopicList from './components/topicList/index.js'
import Footer from '@components/footer'
import { connect } from "react-redux";
import { withRouter } from 'react-router'

@connect(
    store => {
        return {
            searchInfo: store.searchInfo,
            userInfo: store.userInfo
        }
    }
)
class Detail extends React.Component {
    state = {
        userInfo: {},
        search: '',
        baseImgUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/26/512pxIcon-sunset_photo_not_found.png'
    }

    constructor(props) {
        super(props);
    }
    
    componentDidMount () {
        let params = this.props.match.params || {}
        let search = params.content
        this.setState({
            search
        })
    }

    setBaseImg = () => {
        try {
            let baseImgUrl = this.props.searchInfo[0].topic.topicImgList[0]
            return baseImgUrl
        } catch(err) {
            return this.state.baseImgUrl
        }
    }

    render() {
        return (
            <main>
                <Nav />
                <div className="page-container">
                    <div className={Style['search-container']}>
                        {
                            this.state.search?
                            <header>
                                <img className="avatar" src={this.setBaseImg()} height="150px" width="150px"/>
                                <span className="container">#{this.state.search}</span>
                            </header>
                            : ''
                        }

                        <h2 className="title">热门帖子</h2>
                        <TopicList topicList={this.props.searchInfo}/>
                        <Footer />
                    </div>
                </div>
            </main>
        )
    }
}

export default withRouter(Detail)