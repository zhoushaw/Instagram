const defaultValue = {
    topic: {
        counts: 0,
        topicList: []
    },
    fansCounts: 0,
    followCounts: 0
}

const personalInfo = (state = defaultValue, action) => {
    switch (action.type) {
        case 'ADD_PERSONAL_INFO':
            return Object.assign({}, state, action.info)
        case 'ADD_PERSONAL_COMMENT':
            return addComments(state,action.info)
        case 'TOPIC_PERSONAL_LIKE':
            return topicLike(state,action.info)
        default:
            return state
    }
}


// 点赞
function topicLike (state, {
    index, topicLikeCounts, topicLike
}) {
    let newState = Object.assign({}, state)
    let newArray = [...newState.topic.topicList]
    let targetTopic = newArray[index].topic
    Object.assign(
        targetTopic,
        {
            topicLikeCounts,
            topicLike
        }
    )
    return newState
}


//  添加评论
function addComments (state, {
    index, replyContent, replyName
}) {
    let newState = Object.assign({}, state)
    let newArray = [...newState.topic.topicList]
    let sourceComment = {
        replyName,
        replyContent
    }
    
    newArray[index].discuss.push(sourceComment)
    return newState
}


export default personalInfo