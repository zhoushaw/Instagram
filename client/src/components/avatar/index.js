import React from 'react'
import Style from './index.scss'
import PropTypes from "prop-types";


class Avatar extends React.Component{
    constructor(props, context){
        super(props, context)
    }

    static contextTypes = {
        router: PropTypes.object
    }


    goAbout = () => {
        let userId = this.props.userInfo.userId;
        try {
            let path = {
                pathname: `/about/${userId}`,
                // params: data
            }
            this.context.router.history.push(path)
        } catch(err) {
            console.log(err)
        }
    }

    render () {
        const {userInfo} = this.props
        return (
            <div className={Style['avatar-content']}>
                <div className="avatar" onClick={this.goAbout} style={{...this.props.avatarStyle,'backgroundImage': `url(${userInfo.avatarUrl}`}}></div>
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
