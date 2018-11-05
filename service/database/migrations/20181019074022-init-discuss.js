'use strict';

module.exports = {
	// 在执行数据库升级时调用的函数，创建 users 表
	up: async (queryInterface, Sequelize) => {
		const { INTEGER, DATE, STRING, NOW } = Sequelize;
		await queryInterface.createTable('discuss', {
			discuss_id: {type: INTEGER(10), primaryKey: true, autoIncrement: true},// 评论id
			topic_id: {type: INTEGER(10)},// 帖子id
			user_id: {type: STRING(255)},// 用户id
			reply_name: {type: STRING(1000), allowNull: false},// 回复者姓名
			reply_content: {type: STRING(255), allowNull: true}, // 回复内容
			created_at: {type: DATE, defaultValue: NOW}// 回复创建时间
		});
	},
	// 在执行数据库降级时调用的函数，删除 users 表
	down: async queryInterface => {
		await queryInterface.dropTable('discuss');
	}
};
