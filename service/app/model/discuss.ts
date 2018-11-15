module.exports = app => {
  const {STRING, INTEGER, DATE, NOW} = app.Sequelize;

  const Discuss = app.model.define('discuss', {
    discussId: {type: INTEGER(10), primaryKey: true, autoIncrement: true},// 评论id
    topicId: {type: INTEGER(10)},// 帖子id
    userId: {type: STRING(255)},// 用户id
    replyName: {type: STRING(1000), allowNull: false},// 回复者姓名
    replyContent: {type: STRING(255), allowNull: true}, // 回复内容
    created_at: {type: DATE, defaultValue: NOW},// 创建时间
    updated_at: {type: DATE, defaultValue: NOW}// 更新时间
  }, {
    freezeTableName: true // 不自动将表名添加复数
  });

  return Discuss;
};