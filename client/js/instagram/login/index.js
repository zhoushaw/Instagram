import React from 'react'
import ReactDOM from "react-dom";
import SignUp from './components/signup/index.js'
import SignIn from './components/signIn/index.js'
import Style from './index.scss'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignUp: true,
            photoSrc: '1'
        }
        this.initSlideshow()
    }

    toggleSign () {
        this.setState({
            isSignUp: !this.state.isSignUp
        })
    }

    initSlideshow () {
        const photoList = ['1','2','3','4','5']
        let currIndex = 0;
        setInterval(() => {
            if (currIndex>=photoList.length-1) {
                currIndex = 0;
            }
            this.setState({
                photoSrc: photoList[currIndex]
            })
        }, 2000);
    }

    render () {
        return (
            <main className={Style.login}>
                <article className="login_info">
                    <section className="descript">
                        <div className="photo"></div>
                    </section>
                    <section className="login_dialog">
                        {
                            this.state.isSignUp
                            ?<SignUp />
                            :<SignIn />
                        }
                        <div className="toggle_ways">
                            {
                                this.state.isSignUp
                                ?<span>有账号了？<a className="notice" onClick={this.toggleSign.bind(this)}>请登录</a></span>
                                :<span>没有账号？<a className="notice" onClick={this.toggleSign.bind(this)}>注册</a></span>
                            }
                        </div>
                    </section>
                </article>
            </main>
        )
    }
}

export default Login