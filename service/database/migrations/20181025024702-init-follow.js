'use strict';

module.exports = {
	// 在执行数据库升级时调用的函数，创建 follow 表
	up: async (queryInterface, Sequelize) => {
		const { INTEGER, DATE, STRING, NOW } = Sequelize;
		await queryInterface.createTable('follow', {
			id: {type: INTEGER(10), primaryKey: true, autoIncrement: true},// 评论id
			userId: {type: STRING(255)},// 用户id
			followedId: {type: STRING(255)},// 关注者id
			status: {type: INTEGER(1), allowNull: false},// 关注状态 0:取消关注，1:已关注
			created_at: {type: DATE, defaultValue: NOW},// 创建时间
			updated_at: {type: DATE, defaultValue: NOW}// 更新时间
		});
	},
	// 在执行数据库降级时调用的函数，删除 follow 表
	down: async queryInterface => {
		await queryInterface.dropTable('follow');
	}
};
