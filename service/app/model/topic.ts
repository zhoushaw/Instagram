module.exports = app => {
  const {STRING, INTEGER, DATE, NOW} = app.Sequelize;

  const Topic = app.model.define('topic', {
    topic_id: {type: INTEGER, primaryKey: true, autoIncrement: true},//帖子id
    user_id: {type: INTEGER},//用户id
    topic_title: {type: STRING(255), allowNull: true}, // 帖子标题
    topic_img: {type: STRING(1000), allowNull: false},// 图片地址，
    address: {type: STRING(255), allowNull: true}, // 发表地址
    created_at: {type: DATE, defaultValue: NOW},// 创建时间
    updated_at: {type: DATE, defaultValue: NOW}// 更新时间
  });

  return Topic;
};