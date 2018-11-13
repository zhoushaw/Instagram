import React from 'react'
import Style from './index.scss'
import myUtils from '../../common/utils'
import {Link} from 'react-router-dom'

class Nav extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            toggle: true,
            focusStatus: false
        }
        this.onScroll.bind(this)
    }
 
    render () {
        return (
            <nav className={Style['page-header']}>
                <div ref="header" className={`header ${this.state.toggle?'' : 'toggle'}`} >
                    <div className="logo-space">
                    {
                        this.state.toggle?
                        <Link  className="instagram" to={'/'} />
                        :
                        <Link  className="icon" to={'/'} />
                    }
                    </div>
                    <div className="search">
                    {
                        this.state.focusStatus?
                        <div className="search-content">
                            <input className="search-input" type="text" placeholder="搜索" autoFocus={this.state.focusStatus}  onBlur={this.focusSearchInput.bind(this)} />
                            <span className="icon"></span>
                            <span className="close active"></span>
                        </div>
                        : 
                        <div className="search-block" onClick={this.focusSearchInput.bind(this)}>
                            <span className="block-icon"></span>
                            <span className="block-text">搜索</span>
                        </div>
                    }
                    </div>
                    <div className="navigate">
                        <Link  className="explore" to={'/'} />
                        <Link  className="love" to={'/'} />
                        <Link  className="user" to={'/about'} />
                    </div>
                </div>
            </nav>
        )
    }

    focusSearchInput () {
        this.setState({'focusStatus': !this.state.focusStatus})
    }

    onScroll () {
        // 切换头部状态
        const toggle = () => {
            let scrollTop = document.documentElement.scrollTop
            let toggle = false
            
            if (scrollTop >= 58) {
                toggle = false;
            }else {
                toggle = true;
            }
            this.setState({toggle})
        }
        
        return myUtils.throttle(toggle,100);
    }

    componentDidMount(){
        let onScroll = this.onScroll()
        window.addEventListener("scroll", onScroll)
    }

    componentWillUnmount () {
        this.setState = (state,callback)=>{
            return;
        };
    }
}
export default Nav