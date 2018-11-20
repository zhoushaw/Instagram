const defaultValue = [
    {
        userInfo: {
            avatar: 'https://s10.mogucdn.com/mlcdn/c45406/180930_634a7ck1ikea6k139lbgbi343ha2c_150x150.jpg',
            username: 'loading',
            abstract: 'loading'
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
            return addComments(state,action)
        default:
            return state
    }
}


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