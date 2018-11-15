module.exports = app => {
    const {STRING, INTEGER, DATE, NOW} = app.Sequelize;
  
    const TopicLike = app.model.define('topic_like', {
      id: {type: INTEGER(10), primaryKey: true, autoIncrement: true},
			topicId: {type: INTEGER(10)},// 帖子id
			userId: {type: STRING(255)},// 用户id
			status: {type: INTEGER(1)}, // 帖子状态1: 点赞 0: 取消点赞
			created_at: {type: DATE, defaultValue: NOW},// 回复创建时间
			updated_at: {type: DATE, defaultValue: NOW}// 回复创建时间
    }, {
      freezeTableName: true // 不自动将表名添加复数
    });
  
    return TopicLike;
  };