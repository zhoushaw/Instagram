import React from 'react'
import Style from './index.scss'
import API from '@common/api.js'
import Carousel from '@components/carousel'
import Comments from '../comments/comments.js'
import Avatar from '@components/avatar'
import { connect } from 'react-redux'


@connect(
    store => {
        return {
            dynamicList: store.topicList,
            userInfo: store.userInfo
        }
    }
)
class DynamicList extends React.Component {
    constructor(props){
        super(props);
        this.state = {}
    }
    
    render() {
        return (
            <div className={Style['dynamic-list']}>
                {
                    this.props.dynamicList.map((item,index) => {
                        return (
                        <article className="article" key={index}>
                            <header className="header">
                                <Avatar userInfo={item.userInfo}/>
                            </header>
                            
                            <div className="container">
                                <Carousel imageList={item.topic.topicImgList}></Carousel>
                            </div>
                            
                            {/* 评论区 */}
                            <Comments 
                                topicIndex={index}
                                discuss={item.discuss} 
                                topicId={item.topic.topicId} 
                                topicLike={item.topic.topicLike}
                                dotCounts={item.topic.topicLikeCounts}>
                            </Comments>
                        </article>
                        )
                    })
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    userInfo: state.userInfo
})

export default connect(
    mapStateToProps
)(DynamicList)