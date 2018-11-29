import React from 'react'
import Style from './index.scss'
import { connect } from "react-redux";
import { withRouter } from 'react-router'
import Avatar from '@components/avatar'
import Carousel from '@components/carousel'
import { notification} from 'antd';
import API from '@common/api.js'
import Upload from '@components/upload'


let ImageUpload = ({ changeUploadStatus, uploadImgSuccess }) => {
    return (
        <section className="image-upload">
            <div>
                <span className="icon camera"></span>
                <span><Upload successCb={uploadImgSuccess} className={'placeholder'} />上传照片</span>
            </div>
            <div>
                <span className="icon network" onClick={() => {changeUploadStatus(1)}}></span>
                <span>从网络添加图片</span>
            </div>
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
        uploadStatus: 0, // 0: 默认占位图 1: inputUrl 状态 2: 选择照片状态
        imageList: [],
        showInputNotice: true,
        inputUrl: '',
        topicDescript: ''
    }

    // 更改图片输入状态
    changeUploadStatus =  (status) => {
        this.setState({
            uploadStatus: status,
            imageList: []
        })
    }

    // 改变展示输入框提示
    changeInpurUrlStatus = () => {
        this.setState({
            showInputNotice: !this.state.showInputNotice,
            inputUrl: ''
        })
    }

    // 关闭输入网络图片
    closeInputUrl = () => {
        let imgLength = this.state.imageList.length
        if (imgLength === 0) {
            this.setState({
                uploadStatus: 0
            })
        } else if (imgLength > 0) {
            this.setState({
                showInputNotice: true
            })
        }
    }

    // 双向绑定
    handelChange = (value) => {
        this.setState({ inputUrl: value })
    }

    // 双向绑定textarea
    handelChangeTextArea = (event) => {
        this.setState({ topicDescript: event.target.value })
    }

    // 从列表中去除图片
    delectPhoto = (index) => {
        this.setState({
            imageList:  this.state.imageList.filter((_, i) => i !== index)
        })
    }


    uploadImgSuccess = async (url) => {
        this.setState({
            imageList: [...this.state.imageList, url],
            uploadStatus: 2
        })
        console.log(this.state.imageList)
    }

    // 添加网络图片
    pushImgUrl = (event) => {
        if (event.key === 'Enter') {
            let url = event.target.value
            var img = document.createElement('img');
            img.style.display = 'none';
            img.crossorigin = 'anonymous';
            img.src = url;

            // 图片无效
            img.onerror = () => {
                notification['error']({
                    message: '请输入正确图片地址'
                })
            };

            // 图片有效
            img.onload = () => {

                if (this.state.imageList.length === 0) {
                    this.setState({
                        showInputNotice: true
                    })
                }
                this.setState({
                    imageList: [...this.state.imageList, url],
                    inputUrl: ''
                })
            };
        }
    }

    // 发帖
    postTopic = async () => {
        if (this.state.imageList.length === 0) { 
            notification['error']({
                message: "请选择图片"
            });
            return
        }

        let resposne = await API.addTopic({
            topicImg: this.state.imageList,
            topicTitle: this.state.topicDescript
        })
        notification['success']({
            message: resposne.message
        });
        // 关闭发帖弹窗

        this.props.togglePostTopic(true)
    }

    render () {
        let {userInfo} = this.props

        let avatarStyle = {
            width: '40px',
            height: '40px'
        }

        let InputUrl = () => {
            return (
                <section key={1} className="input-url">
                    {
                        this.state.showInputNotice ?
                            <div className="notice" onClick={this.changeInpurUrlStatus}>
                                <i className="icon"></i>
                                {
                                    this.state.imageList.length > 0 ?
                                        <span>添加另一张</span>
                                        :
                                        <span>添加照片</span>
                                }
                            </div>
                            :
                            <div className="input-container">
                                <span className="close-circle" onClick={this.closeInputUrl}></span>
                                <input 
                                    type = 'text' 
                                    defaultValue={this.state.inputUrl} 
                                    // onChange={this.handelChange} 
                                    // onChange={(event) => { this.handelChange(event.target.value) }}
                                    onKeyPress={this.pushImgUrl} 
                                    placeholder="输入图片地址后，按回车即可" />
                            </div>
                        }
                </section>
            )
        }

        let ImgUpload = () => {
            return (
                <section key={2} className="input-url">
                    <div className="notice">
                        <span className="close-circle" onClick={this.closeInputUrl}></span>
                        <i className="icon"></i>
                        <span><Upload successCb={this.uploadImgSuccess} className={'placeholder'} />添加另一张</span>
                    </div>
                </section>
            )
        }

        let UploadPlaceholder = () => {
            return (
                <div>
                    {
                        this.state.uploadStatus === 1 ? <InputUrl /> : ''
                    }
                    {
                        this.state.uploadStatus === 2 ? <ImgUpload /> : ''
                    }
                    {
                        this.state.uploadStatus === 0 ? 
                        <ImageUpload
                            uploadImgSuccess={this.uploadImgSuccess}
                            changeUploadStatus={this.changeUploadStatus}
                        /> : ''
                    }
                </div>
            )
        }

        return (
            <div className={`${Style['post-topic']}`} >
                <section className="topic-content">
                    <header>
                        <Avatar userInfo={userInfo} avatarStyle={avatarStyle}/>
                    </header>
                    
                    {
                        this.state.imageList.length > 0?
                        (
                            <section className="image-list">
                                <Carousel imageList={this.state.imageList} delectPhoto={this.delectPhoto} showCloseBtn={true} showSlickDot={false}></Carousel>
                            </section>
                        )
                        :
                        ""
                    }

                    {/* 上次占位图 */}
                    <div className="upload-style">
                        <UploadPlaceholder />
                    </div>

                    <div className="descript">
                        <textarea  value={this.state.topicDescript} onChange={this.handelChangeTextArea} rows="4" cols="50" placeholder="愿意的话可以添加说明"></textarea>
                    </div>

                    <footer className="footer">
                        <span className="close" onClick={()=> this.props.togglePostTopic()}>关闭</span>
                        <span className="post" onClick={this.postTopic}>发帖</span>
                    </footer>
                </section>
            </div>
        )
    }
}

export default withRouter(PostTopic)