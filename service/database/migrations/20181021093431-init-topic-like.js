'use strict';

module.exports = {
	// 在执行数据库升级时调用的函数，创建 users 表
	up: async (queryInterface, Sequelize) => {
		const { INTEGER, DATE, STRING, NOW } = Sequelize;
		await queryInterface.createTable('topic-like', {
			id: {type: INTEGER(10), primaryKey: true, autoIncrement: true},
			topicId: {type: INTEGER(10)},// 帖子id
			userId: {type: STRING(255)},// 用户id
			status: {type: INTEGER(1)}, // 帖子状态1: 点赞 0: 取消点赞
			created_at: {type: DATE, defaultValue: NOW},// 回复创建时间
			update_at: {type: DATE, defaultValue: NOW}// 回复创建时间
		});
	},
	// 在执行数据库降级时调用的函数，删除 users 表
	down: async queryInterface => {
		await queryInterface.dropTable('topic-like');
	}
};
