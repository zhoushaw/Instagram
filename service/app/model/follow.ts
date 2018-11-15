module.exports = app => {
    const {STRING, INTEGER, DATE, NOW} = app.Sequelize;
  
    const Follow = app.model.define('follow', {
      id: {type: INTEGER(10), primaryKey: true, autoIncrement: true},// 评论id
      userId: {type: STRING(255)},// 用户id
      followedId: {type: STRING(255)},// 关注者id
      status: {type: INTEGER(1), allowNull: false},// 关注状态 0:取消关注，1:已关注
      created_at: {type: DATE, defaultValue: NOW},// 创建时间
      updated_at: {type: DATE, defaultValue: NOW}// 更新时间
    }, {
      freezeTableName: true // 不自动将表名添加复数
    });
  
    return Follow;
  };