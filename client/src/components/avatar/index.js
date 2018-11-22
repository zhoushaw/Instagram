import React from 'react'
import Style from './index.scss'


class Avatar extends React.Component{
    constructor(props, context){
        super(props, context)
    }

    componentDidMount () {
        console.log(this)
    }

    render () {
        const {userInfo} = this.props
        return (
            <div className={Style['avatar-content']}>
                <div className="avatar"  style={{...this.props.avatarStyle,'backgroundImage': `url(${userInfo.avatarUrl}`}}></div>
                  <div className="user_abstract">
                    <div className={`username ${userInfo.username&&'clear-bg'}`} style={{...this.props.usernameStyle}}>{userInfo.username}</div>
                    {/* 设置abstract默认为false，可保持背景色 */}
                    <div className={`abstract ${userInfo.username&&'clear-bg'}`} style={{...this.props.abstractStyle, 'display': userInfo.abstract===false || userInfo.abstract ?'inline-block':'none'}}>{userInfo.abstract}</div>
                  </div>
            </div>
        )
    }
}

Avatar.defaultProps = {
    userInfo: {
        abstract: false
    },
    avatarStyle: {
        'width': '32px',
        'height': '32px'
    },
    usernameStyle: {
        fontWeight: 600,
        fontSize: '14px',
        width: '140px'
    },
    abstractStyle: {
        fontSize: '14px',
        width: 'auto'
    }
}
export default Avatar
