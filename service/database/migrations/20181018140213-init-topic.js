'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 users 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, NOW } = Sequelize;
    await queryInterface.createTable('topic', {
      topicId: {type: INTEGER, primaryKey: true, autoIncrement: true},//帖子id
      userId: {type: INTEGER},//用户id
      topicTitle: {type: STRING(255), allowNull: true}, // 帖子标题
      topicImg: {type: STRING(1000), allowNull: false},// 图片地址，
      address: {type: STRING(255), allowNull: true}, // 发表地址
      created_at: {type: DATE, defaultValue: NOW},// 创建时间
      updated_at: {type: DATE, defaultValue: NOW}// 更新时间
    });
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async queryInterface => {
    await queryInterface.dropTable('topic');
  }
};
