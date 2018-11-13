import React from 'react'
import Style from './index.scss'
import myUtil from '@common/utils.js'
import { connect } from "react-redux";

@connect(
    store => {
        return {
            userInfo: store.userInfo
        }
    }
)
class Recommend extends React.Component {
    constructor(props){
        super(props);
    }
    state = {
        friend_list: [],
        attach: {
            isAttach: false,
            top: 78,
            left: 0
        }
    }
    

    componentDidMount () {
        // this.initData()
        // 设置距离左边距离
        let setLeftFn = () => {
            let offsetleft = this.refs.recommend.offsetLeft
            let attach = Object.assign({}, this.state.attach, {
                left: offsetleft
            })
            this.setState({
                attach
            })
        }
        setLeftFn()
        window.addEventListener('resize', myUtil.debunce(setLeftFn, 500))

        // 检测是否需要贴附
        let fn = () => {
            let isAttach = window.scrollY >= 78

            if (isAttach !== this.state.attach.isAttach) {
                let attach = Object.assign({}, this.state.attach, {
                    isAttach
                })
                this.setState({
                    attach
                })
            }
        }
        window.addEventListener('scroll', fn)
    }

    render () {
        const {userInfo} = this.props
        return (
            <div 
                style={{ left: this.state.attach.left + 'px', top: this.state.attach.top + 'px'}}
                className={`${Style.recommend} ${this.state.attach.isAttach && 'is-attach'}`} 
                ref="recommend">
                <header className="header">
                    <div className = "avatar" style = {{ 'backgroundImage': `url(${userInfo.avatarUrl})`}}></div>
                    <div className="user_abstract">
                        <div className={`username ${userInfo.account&&'clear-bg'}`}>{userInfo.account}</div>
                        <div className={`abstract ${userInfo.username&&'clear-bg'}`}>{userInfo.username}</div>
                    </div>
                </header>
                <section className="container">
                    <nav className="title">快拍</nav>
                    {
                    this.state.friend_list.length === 0
                    ?<p className="notice">你的关注对象动态会显示在这里哦</p>
                    :<ul className="friend_photo">
                        {
                        this.state.friend_list.map((item, index)=>{
                            return (
                            <li className="list" key={index}>
                                <div className="avatar"></div>
                                <div className="user_abstract">
                                <div className="username"></div>
                                <div className="abstract"></div>
                                </div>
                            </li>
                            )
                        })
                        }
                    </ul>
                    }
                </section>
                <section className="introduce">
                    <p>关于我们·支持·新闻中心·API·工作·隐私·条款·目录·个人主页·话题标签·语言</p>
                    <p className="brand">@ 2018 shawzhou</p>
                </section>
            </div>
        )
    }
}

export default Recommend