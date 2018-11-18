import React from 'react'
import Style from './index.scss'
import { connect } from "react-redux";
import { withRouter } from 'react-router'
import Avatar from '@components/avatar'
import Carousel from '@components/carousel'
import { Input, Icon, notification, Popconfirm} from 'antd';



let ImageUpload = ({ changeUploadStatus }) => {
    return (
        <section className="image-upload">
            <div>
                <span className="icon camera"></span>
                <span>上传照片</span>
            </div>
            <div>
                <span className="icon network" onClick={() => {changeUploadStatus(1)}}></span>
                <span>从网络添加图片</span>
            </div>
        </section>
    )
}


let ImgList = ({ imageList }) => {
    if (imageList.length > 0) {
        return (
            <section className="image-list">
                <Carousel imageList={imageList} showCloseBtn={true}></Carousel>
            </section>
        )
    }

    return ''
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
        showInputUrl: false,
        inputUrl: ''
    }

    changeUploadStatus =  (status) => {
        this.setState({
            uploadStatus: status,
            imageList: []
        })
    }

    changeInpurUrlStatus = () => {
        this.setState({
            showInputUrl: !this.state.showInputUrl,
            inputUrl: ''
        })
    }

    handelChange = (event) => {
        this.setState({ inputUrl: event.target.value })
    }

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
                this.setState({
                    imageList: [...this.state.imageList, url],
                    inputUrl: ''
                })
            };
        }
    }

    render () {
        let {userInfo} = this.props

        let avatarStyle = {
            width: '50px',
            height: '50px'
        }

        let InputUrl = () => {
            return (
                <section className="input-url">
                    {
                        !this.state.showInputUrl ?
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
                                <Popconfirm title="关闭后将会清空已输入图片?" onConfirm={this.toggleImageUpload} okText="Yes" cancelText="No">
                                    <span className="close-circle"></span>
                                </Popconfirm>
                                <input value={this.state.inputUrl} onChange={this.handelChange} onKeyUp={this.pushImgUrl} placeholder="输入图片地址后，按回车即可" autoFocus />
                            </div>
                        }
                </section>
            )
        }

        let Upload = () => {
            let view;
            switch (this.state.uploadStatus) {
                case 1:
                    view = <InputUrl />;break;
                default:
                    view = <ImageUpload
                        changeUploadStatus={this.changeUploadStatus}
                    />;
            }
            return view;
        }

        return (
            <div className={`${Style['post-topic']}`} >
                <section className="topic-content">
                    <header>
                        <Avatar userInfo={userInfo} avatarStyle={avatarStyle}/>
                    </header>
                    
                    <ImgList imageList={this.state.imageList} />


                    {/* 上次占位图 */}
                    <div className="upload-style">
                        <Upload />
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