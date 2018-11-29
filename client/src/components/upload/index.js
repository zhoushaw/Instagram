import React from 'react'
import PropTypes from "prop-types";
import * as qiniu from 'qiniu-js'
import Style from './index.scss'
import { notification } from 'antd';
import API from '@common/api.js'

class Upload extends React.Component{


    uploadFn = async () => {
        let response = await API.getToken()
        let {baseUrl, token} = response.data
        let files = this.refs.upload.files

        // 校验图片
        if (!this.imageVerify) return


        var putExtra = {
            fname: "",
            params: {},
            mimeType: ["image/png", "image/jpeg", "image/gif"]
        };

        var config = {
            region: qiniu.region.z0
        };
        
        // 文件名
        let key = new Date().getTime() + files[0].name;
        var observable = qiniu.upload(files[0], key, token, putExtra, config)

        var observer = {
            next: (res) => {
              // ...
            },
            error: (err) => {
                notification.error({
                    message: err
                })
            }, 
            complete: (res) => {
                let imgUrl = baseUrl + '/' + res.key
                this.props.successCb(imgUrl)
            }
        }

        var subscription = observable.subscribe(observer) // 上传开始

    }

    imageVerify = () => {
        let files = this.refs.upload.files
        let fileType = files[0].type;
        if (/^image/.test(fileType)) {
            // 读取结果在fileReader.result里面
           return true
        } else {
            notification.error({
                message: "请选择图片类型文件"
            })
            return false
        }
    }

    render () {
        return (
            <input 
                ref="upload" 
                className={Style['upload-image']} 
                type="file" 
                onChange={this.uploadFn} />
        )
    }
}

Upload.defaultProps = {
    successCb: () => {}
}
export default Upload
