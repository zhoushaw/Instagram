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
    constructor(props) {
        super(props);
        this.initBaseData()
    }

    componentDidMount () {
        let isSelf;
        let params = this.props.location.params || {}
        let userId = this.props.userInfo.userId
        let getUserId = params.userId

        // 与当前登录用户userId不相同或没传输userId视为当前about页面不是本人信息
        if (getUserId === userId || !getUserId) {
            isSelf = true
        } else {
            isSelf = false
        }
        console.log(params, userId, getUserId)
        this.setState({
            isSelf
        })
    }
    
    async initBaseData () {
        // API.getUserInfo().then(response => {
        //     this.props.addUserInfo(response.data)
        // })
        
        // 获取用户帖子列表
        let response = await API.getPersonalInfo()
        this.props.addPersonalInfo(response.data)
    }


    render() {
        let {topic, fansCounts, followCounts} = this.props.personalInfo
        return (
            <main>
                <Nav />
                <div className="page-container">
                <div className={Style['personal-about']}>
                    <UserInfos personalInfo={
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