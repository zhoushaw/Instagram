import React from 'react'
import PropTypes from "prop-types";
import * as qiniu from 'qiniu-js'
import Style from './index.scss'
import { notification } from 'antd';

class Upload extends React.Component{


    uploadFn = () => {
        let files = this.refs.upload.files
        let fileType = files[0].type;
        if (/^image/.test(fileType)) {
            // 读取结果在fileReader.result里面
           
        } else {
            notification['error']({
                message: "请选择图片类型文件"
            })
        }
        
        var putExtra = {
            fname: "",
            params: {},
            mimeType: [] || null
        };
        var config = {
            // useCdnDomain: true,
            region: qiniu.region.z2
        };
        let token = 'Jyi6Ntprm38nI6n1heGjwXyQmzie8ZjY7l9Cq_Je:pmA4lE0xsPRmnGO9s8cEkgTGJ-g=:eyJzY29wZSI6ImRhbmthbC1jZG4iLCJkZWFkbGluZSI6MTU0MzI1Mjk3M30='
        var observable = qiniu.upload(files[0], null, token, putExtra, config)

        var observer = {
            next(res){
                console.log(res)
              // ...
            },
            error(err){
              // ...
            }, 
            complete(res){
                console.log(res)
              // ...
            }
        }

        var subscription = observable.subscribe(observer) // 上传开始

        console.log(this.refs.upload.files)

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

}
export default Upload
