




// 新增帖子参数
export interface insertTopicParams {
    topicImg: string, // 图片地址
    topicTitle: string, // 帖子标题
    userId: string // 用户id
}


// 新增评论参数
export interface insertDiscussParams {
    topicId: string, // 帖子id
    replyContent: string, // 帖子内容
    replyName: string, // 用户名
    userId: string // 用户id
}

// 查询帖子详情
export interface queryTopicParams {
    topicId: string | number, // 帖子id
    userId?: string, // 用户id 
    status?: number
}

// 查询用户帖子数量
export interface queryTopicCountsParams {
    userId: string // 用户id 
}
