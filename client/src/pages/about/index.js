import React from 'react'
import Style from './index.scss'
import Nav from '../../components/nav/index.js'
import UserInfos from './components/userInfos/index.js'
import FavoriteList from './components/favoriteList/index.js'
import Footer from '@components/footer'
import API from '@common/api'
import { connect } from "react-redux";
import { withRouter } from 'react-router'

@connect(
    store => {
        return {
            personalInfo: store.personalInfo,
            userInfo: store.userInfo,
            isSelf: true
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
        userInfos: {}
    }

    constructor(props) {
        super(props);
    }

    async componentDidMount () {
        let isSelf;
        console.log(this.props)
        let params = this.props.match.params || {}
        let userId = this.props.userInfo.userId
        let getUserId = params.userId

        // 与当前登录用户userId不相同或没传输userId视为当前about页面不是本人信息
        if (getUserId === userId || !getUserId) {
            isSelf = true
        } else {
            isSelf = false
        }

        let userInfos;
        if (!isSelf) {
            let response = await API.getUserInfo({params: {userId: getUserId}})
            userInfos = response.data
        }

        this.setState({
            isSelf,
            userInfos
        })

        // 获取帖子列表
        this.initBaseData(isSelf ? userId : getUserId)
    }
    
    async initBaseData(userId) {
        let params = {
            userId
        }
        
        // 获取用户帖子列表
        let response = await API.getPersonalInfo({ params })
        this.props.addPersonalInfo(response.data)
    }


    render() {
        let {topic, fansCounts, followCounts} = this.props.personalInfo
        return (
            <main>
                <Nav />
                <div className="page-container">
                <div className={Style['personal-about']}>
                        <UserInfos isSelf={this.state.isSelf} userInfo={this.state.isSelf ? this.props.userInfo : this.state.userInfos} personalInfo={
                            {
                                topicCounts: topic.counts,
                                fansCounts: fansCounts,
                                followCounts: followCounts
                            }
                        } />
                        <FavoriteList topicList={topic.topicList}/>
                        <Footer />
                </div>
                </div>
            </main>
        )
    }
}

export default withRouter(Detail)