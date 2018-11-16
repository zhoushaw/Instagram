import React from 'react'
import Style from './index.scss'
import { connect } from "react-redux";
import { withRouter } from 'react-router'
import Avatar from '@components/avatar'
import { Input } from 'antd';
const { TextArea } = Input;



let ImageUpload = () => {
    return (
        <section className="image-upload">
            <div>
                <span className="icon camera"></span>
                <span>上传照片</span>
            </div>
            <div>
                <span className="icon network"></span>
                <span>从网络添加图片</span>
            </div>
        </section>
    )
}

let InputUrl = ({ showInputUrl, changeInpurUrlStatus }) => {
    return (
        <section className="input-url">
            {
                showInputUrl?
                    <div className="notice" onClick={changeInpurUrlStatus}>
                        <i className="icon"></i>
                        <span>添加另一张</span>
                    </div>
                    : 
                    <input placeholder="输入图片地址后，按回车即可" autoFocus />
            }
        </section>
    )
}

let ImgList = () => {
    return (
        <section className="input-url">
            <input />
        </section>
    )
}

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

    state = {
        showInputImag: true,
        imgList: [],
        showInputUrl: true
    }

    changeInpurUrlStatus = () => {
        this.setState({
            showInputUrl: false
        })
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

                    {/* 上次占位图 */}
                    <div className="upload-style">
                        {
                            this.state.showInputImag?
                                <InputUrl showInputUrl={this.state.showInputUrl} changeInpurUrlStatus={this.changeInpurUrlStatus}/>
                                : <ImageUpload />
                        }
                    </div>


                    <div className="descript">
                        <textarea rows="4" cols="50" placeholder="愿意的话可以添加说明"></textarea>
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