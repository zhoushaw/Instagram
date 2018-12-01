import React from 'react'
import { Icon } from 'antd';
import Style from './index.scss'
import TopicDialog from '@components/topicDialog'
import { connect } from 'react-redux'


@connect(
    store => {
        return {
            dynamicList: store.topicList,
            userInfo: store.userInfo
        }
    },
    dispatch => {
        return {
            addComments: info => {
                dispatch({
                    type: 'ADD_SEARCH_COMMENT',
                    info
                })
            },
            topicLikeFn: info => {
                dispatch({
                    type: 'TOPIC_SEARCH_LIKE',
                    info
                })
            }
        };
    }
)
class FavoriteList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasData: false
        }
    }

    showDialog = (item, topicIndex) => {
        // 显示弹窗内容
        TopicDialog.open({
            ...item,
            topicIndex,
            addComments: this.props.addComments,
            topicLikeFn: this.props.topicLikeFn
        });
    }

    render() {
        return (
            <main>
                <div className={Style['favorite-list']}>
                    <section className="favorite-container">
                    {
                        this.props.topicList.length >0 ?
                        <div className="descript">
                            <ul className="topic-list">
                                {
                                    this.props.topicList.map((item, index) => {
                                        return (
                                            <li className="topic" key={item.topic.topicId} onClick={() =>{ this.showDialog(item, index)}}>
                                                <img src={item.topic.topicImgList[0]} height="293px"  width="293px"/>
                                                <div className="abstract">
                                                    {
                                                        item.discuss.length > 0 ?
                                                            <span className="comments"><i className="icon"></i>{item.discuss.length}</span>
                                                            :
                                                            ""
                                                    }
                                                    {
                                                        item.topic.topicLikeCounts> 0?
                                                        <span className="favorite"><i className="icon"></i>{item.topic.topicLikeCounts}</span>
                                                        : 
                                                        ""
                                                    }
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        :
                        <div  className="descript">
                            <div className="no-more">
                                <Icon  className="no-more-icon" type="linkedin" />
                                <span className="notice">没有帖子</span>
                            </div>
                        </div>
                    }
                    </section>
                </div>
            </main>
        )
    }
}

export default FavoriteList