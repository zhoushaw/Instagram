import React from 'react'
import Style from './index.scss'
import { connect } from "react-redux";
import { withRouter } from 'react-router'
import Avatar from '@components/avatar'
import { Input, Icon} from 'antd';
const { TextArea } = Input;



let ImageUpload = ({ toggleImageUpload }) => {
    return (
        <section className="image-upload">
            <div>
                <span className="icon camera"></span>
                <span>上传照片</span>
            </div>
            <div>
                <span className="icon network" onClick={toggleImageUpload}></span>
                <span>从网络添加图片</span>
            </div>
        </section>
    )
}

let InputUrl = ({ showInputUrl, changeInpurUrlStatus, imgList, toggleImageUpload }) => {
    return (
        <section className="input-url">
            <Icon className="close" type="close-circle" onClick={toggleImageUpload}/>
            {
                showInputUrl?
                    <div className="notice" onClick={changeInpurUrlStatus}>
                        <i className="icon"></i>
                        {
                            imgList.length> 0?
                            <span>添加另一张</span>
                            :
                            <span>添加照片</span>
                        }
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
        showImageUpload: true,
        imgList: [],
        showInputUrl: true
    }

    toggleImageUpload =  () => {
        this.setState({
            showImageUpload: !this.state.showImageUpload
        })
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
                            this.state.showImageUpload?
                                <ImageUpload 
                                    toggleImageUpload={this.toggleImageUpload}
                                />
                                :
                                <InputUrl 
                                    imgList={this.state.imgList}
                                    showInputUrl={this.state.showInputUrl} 
                                    toggleImageUpload={this.toggleImageUpload}
                                    changeInpurUrlStatus={this.changeInpurUrlStatus}/>
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