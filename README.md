
## 简介

> 技术栈

- react全家桶
- ant design
- egg.js
- mysql

前后端分离开发模式，前端项目与后端项目属于不同的工程

```javascript
// instagram/client 前端工程
// instagram/service 后端工程
```

**注：此项目纯属个人瞎搞，与instagram无任何关系。**


## 运行项目

**因前后端不同端口原因，为解决跨域。前端工程启动了devServer，需先启动后端工程**

* git clone https://github.com/zhoushaw/Instagram.git
* cd Instagram

> 运行后端项目

* 首先新建learn数据库，并将/db/learn.sql，导入learn库中
*  配置数据库信息

```javascript
// 前往service/config/config.local.ts，配置你的数据库信息
config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'learn',
    username: '', 
    password: '', 
    operatorsAliases: false
};
```
* 在/service文件下
* npm install
* npm run dev


> 运行前端项目

* cd client
* npm install
* npm start