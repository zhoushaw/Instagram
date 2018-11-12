import React from 'react'
import Style from './index.scss'
import store from '@/src/store'

class Recommend extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            friend_list: ['', '', '', '', ''],
            userInfo: {
                avatar: '',
                username: 'loading',
                abstract: 'loading'
            },
            attach: {
                isAttach: false,
                top: 78,
                left: 0
            }
        }

        // 获取store数据，获取userInfo
        store.subscribe(() =>
            this.setState({
                userInfo: store.getState().userInfo
            })
        );
    }

    initData () {
        this.setState({
            friend_list: []
        })
    }

    componentDidMount () {
        this.initData()

        // 设置距离左边距离
        let offsetleft = this.refs.recommend.offsetLeft
        let attach = Object.assign({}, this.state.attach, {
            left: offsetleft
        })
        this.setState({
            attach
        })


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

    return (
        <div 
            style={{ left: this.state.attach.left + 'px', top: this.state.attach.top + 'px'}}
            className={`${Style.recommend} ${this.state.attach.isAttach && 'is-attach'}`} 
            ref="recommend">
            <header className="header">
                <div className = "avatar" style = {{ 'backgroundImage': `url(${this.state.userInfo.avatarUrl})`}}></div>
                <div className="user_abstract">
                    <div className={`username ${this.state.userInfo.username&&'clear-bg'}`}>{this.state.userInfo.username}</div>
                    {
                        this.state.userInfo.abstract?
                        <div className={`abstract ${this.state.userInfo.abstract&&'clear-bg'}`}>{this.state.userInfo.abstract}</div>
                        : ''
                    }
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