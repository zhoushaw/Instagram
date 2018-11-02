




// 新增帖子参数
export interface insertTopicParams {
    topic_img: Array<String>, // 图片地址
    topic_title: string, // 帖子标题
    user_id: string // 用户id
}


// 新增评论参数
export interface insertDiscussParams {
    topic_id: string, // 帖子id
    reply_content: string, // 帖子内容
    reply_name: string, // 用户名
    user_id: string // 用户id
}

// 查询帖子详情
export interface queryTopicParams {
    topic_id: string | number // 帖子id
}

