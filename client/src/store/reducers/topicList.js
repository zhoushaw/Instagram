const defaultValue = [
    {
        userInfo: {
            avatar: 'https://s10.mogucdn.com/mlcdn/c45406/180930_634a7ck1ikea6k139lbgbi343ha2c_150x150.jpg',
            username: '',
            abstract: false
        },
        topic: {
            topicImgList: [],
            createdAt: '',
            topicLikeCounts: 0 // 点赞数
        },
        discuss: []
    }
]

const topicList = (state = defaultValue, action) => {
    switch (action.type) {
        case 'ADD_TOPICLIST':
            return [...action.info]
        case 'ADD_COMMENT':
            return addComments(state,action.info)
        case 'TOPIC_LIKE':
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


export default topicList