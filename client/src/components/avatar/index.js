import React from 'react'
import Style from './index.scss'


class Avatar extends React.Component{
    constructor(props){
        super(props)
    }

    render () {
        const {userInfo} = this.props
        return (
            <div className={Style['avatar-content']}>
                <div className="avatar"  style={{...this.props.avatarStyle,'backgroundImage': `url(${userInfo.avatarUrl}`}}></div>
                  <div className="user_abstract">
                    <div className={`username ${userInfo.username&&'clear-bg'}`} style={{...this.props.usernameStyle}}>{userInfo.username}</div>
                    {
                        userInfo.abstract?
                        <div className={`abstract ${userInfo.abstract&&'clear-bg'}`}>{userInfo.abstract}</div>
                        : ''
                    }
                  </div>
            </div>
        )
    }
}

Avatar.defaultProps = {
    avatarStyle: {
        'width': '32px',
        'height': '32px'
    },
    usernameStyle: {
        fontWeight: 600,
        fontSize: '14px',
        width: '140px'
    },
    buttonStyle: {
        
    }
}
export default Avatar
