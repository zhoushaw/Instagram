/*
 Navicat Premium Data Transfer

 Source Server         : instagram
 Source Server Type    : MySQL
 Source Server Version : 80012
 Source Host           : localhost:3306
 Source Schema         : learn

 Target Server Type    : MySQL
 Target Server Version : 80012
 File Encoding         : 65001

 Date: 01/12/2018 16:59:46
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for discuss
-- ----------------------------
DROP TABLE IF EXISTS `discuss`;
CREATE TABLE `discuss` (
  `discussId` int(10) NOT NULL AUTO_INCREMENT COMMENT '评论id',
  `topicId` int(10) NOT NULL COMMENT '帖子id',
  `userId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户id',
  `replyName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '回复者姓名',
  `replyContent` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '回复内容',
  `created_at` datetime(4) NOT NULL ON UPDATE CURRENT_TIMESTAMP(4) COMMENT '回复创建时间',
  `updated_at` datetime(4) NOT NULL,
  PRIMARY KEY (`discussId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of discuss
-- ----------------------------
BEGIN;
INSERT INTO `discuss` VALUES (10, 1, 'a9445c646fd54a3d950f52df473c0380', 'shawzhou', '我的天', '2018-11-12 07:47:19.0000', '2018-11-12 07:47:19.0000');
INSERT INTO `discuss` VALUES (11, 1, 'a9445c646fd54a3d950f52df473c0380', 'shawzhou', '呜呜呜', '2018-11-12 07:47:21.0000', '2018-11-12 07:47:21.0000');
INSERT INTO `discuss` VALUES (12, 1, 'a9445c646fd54a3d950f52df473c0380', 'shawzhou', '哈哈哈', '2018-11-12 07:47:24.0000', '2018-11-12 07:47:24.0000');
INSERT INTO `discuss` VALUES (13, 1, 'a9445c646fd54a3d950f52df473c0380', 'shawzhou', '啦啦', '2018-11-12 07:47:25.0000', '2018-11-12 07:47:25.0000');
INSERT INTO `discuss` VALUES (15, 1, 'a9445c646fd54a3d950f52df473c0380', 'shawzhou', 'wuuw', '2018-11-12 07:48:28.0000', '2018-11-12 07:48:28.0000');
INSERT INTO `discuss` VALUES (16, 1, 'a9445c646fd54a3d950f52df473c0380', 'shaw', '我的天(=@__@=)哪里？', '2018-11-14 09:17:17.0000', '2018-11-14 09:17:17.0000');
INSERT INTO `discuss` VALUES (17, 1, 'a9445c646fd54a3d950f52df473c0380', 'shaw', 'hi,my name is shawzhou', '2018-11-14 09:23:31.0000', '2018-11-14 09:23:31.0000');
INSERT INTO `discuss` VALUES (18, 1, 'a9445c646fd54a3d950f52df473c0380', 'shaw', 'lol', '2018-11-14 09:23:36.0000', '2018-11-14 09:23:36.0000');
INSERT INTO `discuss` VALUES (19, 3, 'e51c2d2e4366433fb35f017c69468149', 'woshishui', '好酷啊，天哪！！！', '2018-12-01 08:51:52.0000', '2018-12-01 08:51:52.0000');
INSERT INTO `discuss` VALUES (20, 2, 'e51c2d2e4366433fb35f017c69468149', 'woshishui', '帅气！！', '2018-12-01 08:51:59.0000', '2018-12-01 08:51:59.0000');
INSERT INTO `discuss` VALUES (21, 4, 'e51c2d2e4366433fb35f017c69468149', 'woshishui', '风景图！', '2018-12-01 08:52:09.0000', '2018-12-01 08:52:09.0000');
COMMIT;

-- ----------------------------
-- Table structure for follow
-- ----------------------------
DROP TABLE IF EXISTS `follow`;
CREATE TABLE `follow` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户id',
  `followedId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '关注者id',
  `status` int(1) NOT NULL COMMENT '关注状态 0:取消关注 1:已关注',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '最后更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of follow
-- ----------------------------
BEGIN;
INSERT INTO `follow` VALUES (5, 'c1dcc8a53ce6493ca05a357aac2d0aa4', 'a9445c646fd54a3d950f52df473c0380', 1, '2018-11-15 09:39:02', '2018-11-15 09:39:10');
INSERT INTO `follow` VALUES (6, 'a9445c646fd54a3d950f52df473c0380', 'c1dcc8a53ce6493ca05a357aac2d0aa4', 1, '2018-11-15 10:36:33', '2018-11-15 10:36:33');
INSERT INTO `follow` VALUES (7, 'cbd6eb6093e74c7290aad936e8a9a2cd', 'daabb0b0a90244a5b3204ac6779708dc', 1, '2018-12-01 08:47:54', '2018-12-01 08:53:34');
INSERT INTO `follow` VALUES (8, 'e51c2d2e4366433fb35f017c69468149', 'cbd6eb6093e74c7290aad936e8a9a2cd', 1, '2018-12-01 08:53:34', '2018-12-01 08:55:33');
COMMIT;

-- ----------------------------
-- Table structure for SequelizeMeta
-- ----------------------------
DROP TABLE IF EXISTS `SequelizeMeta`;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of SequelizeMeta
-- ----------------------------
BEGIN;
INSERT INTO `SequelizeMeta` VALUES ('20181012071252-init-users.js');
INSERT INTO `SequelizeMeta` VALUES ('20181012072948-init-users.js');
INSERT INTO `SequelizeMeta` VALUES ('20181018140213-init-topic.js');
INSERT INTO `SequelizeMeta` VALUES ('20181019074022-init-discuss.js');
INSERT INTO `SequelizeMeta` VALUES ('20181021093431-init-topic-like.js');
INSERT INTO `SequelizeMeta` VALUES ('20181025024702-init-follow.js');
COMMIT;

-- ----------------------------
-- Table structure for topic
-- ----------------------------
DROP TABLE IF EXISTS `topic`;
CREATE TABLE `topic` (
  `topicId` int(10) NOT NULL AUTO_INCREMENT COMMENT '帖子唯一id',
  `userId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户id',
  `topicTitle` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '帖子标题',
  `topicImg` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '帖子图片列表',
  `created_at` datetime NOT NULL COMMENT '帖子创建时间',
  `updated_at` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '帖子最后更新时间',
  `address` varchar(255) NOT NULL COMMENT '发表地址',
  PRIMARY KEY (`topicId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of topic
-- ----------------------------
BEGIN;
INSERT INTO `topic` VALUES (1, 'a9445c646fd54a3d950f52df473c0380', '用户四帖子', '[\"http://p0.ifengimg.com/pmop/2017/1102/901DB09B75FD0FB5422F657D8706E493B04A10ED_size115_w1200_h675.jpeg\",\"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Raijin-ogata-emuseum.JPG/300px-Raijin-ogata-emuseum.JPG\"]', '2018-11-05 01:45:40', '2018-11-05 01:45:40', '');
INSERT INTO `topic` VALUES (2, 'cbd6eb6093e74c7290aad936e8a9a2cd', '詹姆斯、篮球！！', '[\"http://pic8.nipic.com/20100727/4745653_164946829874_2.jpg\",\"http://pic5.nipic.com/20100104/2590249_091443085128_2.jpg\"]', '2018-12-01 08:46:47', '2018-12-01 08:46:47', '');
INSERT INTO `topic` VALUES (3, 'cbd6eb6093e74c7290aad936e8a9a2cd', '科比、篮球！！', '[\"http://img.article.pchome.net/00/22/99/77/pic_lib/wm/kb_01.jpg\",\"http://www.pc6.com/uploadimages/2009-11/2009112261377237.jpg\"]', '2018-12-01 08:47:24', '2018-12-01 08:47:24', '');
INSERT INTO `topic` VALUES (4, 'e51c2d2e4366433fb35f017c69468149', '风景图片', '[\"http://img3.3lian.com/2013/c2/80/d/1.jpg\",\"http://img3.3lian.com/2013/v11/41/d/81.jpg\"]', '2018-12-01 08:51:40', '2018-12-01 08:51:40', '');
INSERT INTO `topic` VALUES (5, 'daabb0b0a90244a5b3204ac6779708dc', '时尚', '[\"http://pic.nipic.com/2007-12-22/20071222104958273_2.jpg\"]', '2018-12-01 08:54:24', '2018-12-01 08:54:24', '');
COMMIT;

-- ----------------------------
-- Table structure for topic_like
-- ----------------------------
DROP TABLE IF EXISTS `topic_like`;
CREATE TABLE `topic_like` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `userId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户id',
  `topicId` int(10) NOT NULL COMMENT '帖子id',
  `status` int(1) NOT NULL COMMENT '点赞状态1:有效赞,0:无效赞',
  `created_at` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of topic_like
-- ----------------------------
BEGIN;
INSERT INTO `topic_like` VALUES (1, '369a08c015df4f61a802099673cf92aa', 1, 1, '2018-10-21 12:57:07', '2018-10-21 12:57:07');
INSERT INTO `topic_like` VALUES (2, 'a9445c646fd54a3d950f52df473c0380', 1, 0, '2018-11-15 03:51:47', '2018-11-15 03:51:47');
INSERT INTO `topic_like` VALUES (3, 'c1dcc8a53ce6493ca05a357aac2d0aa4', 1, 1, '2018-11-15 10:38:50', '2018-11-15 10:38:50');
INSERT INTO `topic_like` VALUES (4, 'e51c2d2e4366433fb35f017c69468149', 4, 1, '2018-12-01 08:51:43', '2018-12-01 08:51:43');
INSERT INTO `topic_like` VALUES (5, 'e51c2d2e4366433fb35f017c69468149', 3, 1, '2018-12-01 08:51:44', '2018-12-01 08:51:44');
INSERT INTO `topic_like` VALUES (6, 'daabb0b0a90244a5b3204ac6779708dc', 5, 1, '2018-12-01 08:54:30', '2018-12-01 08:54:30');
INSERT INTO `topic_like` VALUES (7, 'daabb0b0a90244a5b3204ac6779708dc', 2, 1, '2018-12-01 08:55:13', '2018-12-01 08:55:13');
INSERT INTO `topic_like` VALUES (8, 'daabb0b0a90244a5b3204ac6779708dc', 3, 1, '2018-12-01 08:58:55', '2018-12-01 08:58:55');
COMMIT;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `avatarUrl` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `mobile` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `prefix` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `sex` varchar(1) DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime NOT NULL,
  `abstract` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
INSERT INTO `users` VALUES (3, 'cbd6eb6093e74c7290aad936e8a9a2cd', 'shawzhou', '466150516@qq.com', '111111', 'http://piyhxgz90.bkt.clouddn.com/1543653964188头像.jpg', NULL, '86', '男', '2018-12-01 08:45:12', '2018-12-01 08:46:09', '我是一个球员');
INSERT INTO `users` VALUES (4, 'e51c2d2e4366433fb35f017c69468149', 'woshishui', 'codingzx@gmail.com', '111111', 'http://piyhxgz90.bkt.clouddn.com/1543654269146风景.jpg', NULL, '86', '男', '2018-12-01 08:47:47', '2018-12-01 08:52:30', '风景专家');
INSERT INTO `users` VALUES (5, 'daabb0b0a90244a5b3204ac6779708dc', 'wuwan', 'wuwantian@gmail.com', '111111', 'http://piyhxgz90.bkt.clouddn.com/15436544923382531170_182711296228_2.jpg', NULL, '86', '女', '2018-12-01 08:52:49', '2018-12-01 08:54:58', NULL);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
