import React from 'react'
import Style from './index.scss'
import Nav from '../../components/nav/index.js'
import TopicList from './components/topicList/index.js'
import Footer from '@components/footer'
import API from '@common/api'
import { connect } from "react-redux";
import { withRouter } from 'react-router'

@connect(
    store => {
        return {
            personalInfo: store.personalInfo,
            userInfo: store.userInfo
        }
    },
    dispatch => {
        return {
            addPersonalInfo: info => {
                dispatch({
                    type: 'ADD_PERSONAL_INFO',
                    info: info
                })
            }
        };
    }
)
class Detail extends React.Component {
    state = {
        userInfo: {},
        hasFollow: false,
        isSelf: true
    }

    constructor(props) {
        super(props);
    }

    async componentDidMount () {
        let params = this.props.match.params || {}
        let userId = params.userId

        let response = await API.getUserInfo({params: {userId}})
        let userInfo = response.data

        this.setState({
            userInfo
        })

        // 获取帖子列表
        this.initBaseData(userId)
    }
    
    async initBaseData(userId) {
        let params = {
            userId
        }
        
        // 获取用户帖子列表
        let response = await API.getPersonalInfo({ params })
        let {isSelf, hasFollow} = response.data
        this.props.addPersonalInfo(response.data)
        this.setState({
            isSelf,
            hasFollow
        })
    }

    render() {
        let {topic} = this.props.personalInfo
        return (
            <main>
                <Nav />
                <div className="page-container">
                    <div className={Style['search']}>
                            <TopicList topicList={topic.topicList}/>
                            <Footer />
                    </div>
                </div>
            </main>
        )
    }
}

export default withRouter(Detail)