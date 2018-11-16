import React from 'react'
import Style from './index.scss'
import { connect } from "react-redux";
import { withRouter } from 'react-router'
import Avatar from '@components/avatar'

@connect(
    store => {
        return {
            userInfo: store.userInfo
        }
    }
)
class PostTopic extends React.Component {
    constructor(props){
        super(props);
    }

    render () {
        let {userInfo} = this.props

        let avatarStyle = {
            width: '50px',
            height: '50px'
        }

        return (
            <div className={`${Style['post-topic']}`} >
                <section className="topic-content">
                    <header>
                        <Avatar userInfo={userInfo} avatarStyle={avatarStyle}/>
                    </header>
                    <div className="image-upload">
                        <div>
                            <span className="icon camera"></span>
                            <span>上传照片</span>
                        </div>
                        <div>
                            <span className="icon network"></span>
                            <span>上传照片</span>
                        </div>
                    </div>
                    <footer className="footer">
                        <span className="close">关闭</span>
                        <span className="post">发帖</span>
                    </footer>
                </section>
            </div>
        )
    }
}

export default withRouter(PostTopic)