import React from 'react'
import Style from './index.scss'
import EditAccounts from './components/edit'
import Nav from '../../components/nav/index.js'
import Footer from '@components/footer'

class Accounts extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            navList: ['编辑主页', '更改密码'],
            currIndex: 0
        }
    }
    
    changeCurrIndex (index) {
        this.setState({
            currIndex: index
        })
    }

    render () {
        return (
            <main>
                <Nav />
                <div className="page-container">
                    <section className={Style['accounts']}>
                        <nav>
                            <ul className="operation-list">
                                {
                                    this.state.navList.map((item, index) => {
                                        return (
                                            <li className={index === this.state.currIndex ? 'active' : ''} key={index} onClick={this.changeCurrIndex.bind(this, index)}>
                                                {item}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </nav>
                        <section className="operation-content">
                            <EditAccounts />
                        </section>
                    </section>
                    <Footer />
                </div>
            </main>
        )
    }

}
export default Accounts