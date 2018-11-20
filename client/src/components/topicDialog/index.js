import React from 'react'
import Style from './index.scss'
import { withRouter } from 'react-router'



class TopicDetail extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            toggle: true,
            focusStatus: false
        }
    }
 
    
    render () {
        return (
            <section className={Style['topic-dialog']}>
                
            </section>
        )
    }

}

export default withRouter(TopicDetail)
