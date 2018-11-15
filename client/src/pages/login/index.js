import React from 'react'
import SignUp from './components/signup/index.js'
import SignIn from './components/signIn/index.js'
import Style from './index.scss'
import Footer from '@components/footer'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignUp: true
        }
    }

    toggleSign () {
        this.setState({
            isSignUp: !this.state.isSignUp
        })
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
                            ? <SignIn />
                            : <SignUp toggleSign={this.toggleSign.bind(this)}/>
                        }
                        <div className="toggle_ways">
                            {
                                this.state.isSignUp
                                ?<span>没有账号？<a className="notice" onClick={this.toggleSign.bind(this)}>注册</a></span>
                                :<span>有账号了？<a className="notice" onClick={this.toggleSign.bind(this)}>请登录</a></span>
                            }
                        </div>
                    </section>
                </article>
                <Footer />
            </main>
        )
    }
}

export default Login