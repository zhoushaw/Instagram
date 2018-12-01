const defaultValue = []

const searchInfo = (state = defaultValue, action) => {
    switch (action.type) {
        case 'ADD_SEARCH_INFO':
            return [...action.info]
        case 'ADD_SEARCH_COMMENT':
            return addComments(state,action.info)
        case 'TOPIC_SEARCH_LIKE':
            return topicLike(state,action.info)
        default:
            return state
    }
}


// 点赞
function topicLike (state, {
    index, topicLikeCounts, topicLike
}) {
    let newArray = [...state]
    let targetTopic = newArray[index].topic
    Object.assign(
        targetTopic,
        {
            topicLikeCounts,
            topicLike
        }
    )
    return newArray
}


//  添加评论
function addComments (state, {
    index, replyContent, replyName
}) {
    let newArray = [...state]
    let sourceComment = {
        replyName,
        replyContent
    }
    
    newArray[index].discuss.push(sourceComment)
    return newArray
}


export default searchInfo