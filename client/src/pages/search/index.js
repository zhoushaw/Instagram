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
        baseImgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543650526308&di=1029a2eec54305da24c39a978050f385&imgtype=0&src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2F45%2F73%2Fde%2F4573de61472198a6d2b03a8ac122ccec.jpg'
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