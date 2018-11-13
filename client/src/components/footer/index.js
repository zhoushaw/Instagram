import React from 'react'
import Style from './index.scss'
class Footer extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }
 
    render () {
        return (
            <footer className={Style['page-footer']}>
                <ul className="nav">
                    <li>关于我们</li>
                    <li>支持</li>
                    <li>新闻中心</li>
                    <li>API</li>
                    <li>工作</li>
                    <li>隐私</li>
                    <li>条款</li>
                    <li>目录</li>
                    <li>个人主页</li>
                    <li>话题标签</li>
                    <li>语言</li>
                </ul>
                <span className="sign u-f-lightblack2">© 2018 Instagram</span>
            </footer>
        )
    }

}
export default Footer