## 起步

## mongdob环境搭建

> 安装mongodb

可参考[菜鸟教程](!http://www.runoob.com/mongodb/mongodb-osx-install.html)

* cd /usr/local
* sudo curl -O https://fastdl.mongodb.org/osx/mongodb-osx-x86_64-3.4.2.tgz
* sudo tar -zxvf mongodb-osx-x86_64-3.4.2.tgz
* sudo mv mongodb-osx-x86_64-3.4.2 mongodb
* export PATH=/usr/local/mongodb/bin:$PATH

> 运行mongodb使用instagram数据库

* sudo mkdir -p /data/db
* mongod --dbpath /data/db
`无权限使用 sudo mongod --dbpath /data/db`

`打开另一个命令行窗口`
* mongodb
* use instagram

## 运行web项目

> 安装依赖

`yarn install`

> 启动

`npm run start`