import React from 'react'
import DynamicList from './components/dynamic-list'
import Recommend from './components/recommend'
import AttentionList from './components/attention-list'
import Nav from '@components/nav/index.js'
import Style from './index.scss'

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasTopic: true
        }
    }

    noTopic =  (status) => {
        this.setState({
            hasTopic: status
        })
    }

    render() {
        return (
            <main>
                <Nav />
                <div className="page-container">
                    <div className={Style['home-detail']}>
                        <span className="loading"></span>
                        {
                            this.state.hasTopic?
                            <section>
                                <DynamicList noTopic={this.noTopic}/>
                                <Recommend />
                            </section>
                            :
                            <AttentionList />
                        }
                    </div>
                </div>
            </main>
        )
    }
}

export default Detail