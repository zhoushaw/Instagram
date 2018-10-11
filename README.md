## 起步

## mongdob环境搭建

> 安装mongodb

可参考[菜鸟教程](!http://www.runoob.com/mongodb/mongodb-osx-install.html)

```
1、cd /usr/local
2、sudo curl -O https://fastdl.mongodb.org/osx/mongodb-osx-ssl-x86_64-4.0.2.tgz
3、sudo tar -zxvf mongodb-osx-ssl-x86_64-4.0.2.tgz
4、sudo mv mongodb-osx-ssl-x86_64-4.0.2.tgz
5、vim ~/.zshrc
#mongo
export MONGO_PATH=/usr/local/mongodb/mongodb-osx-ssl-x86_64-4.0.2.tgz
export PATH=$PATH:$MONGO_PATH/bin
```


> 运行mongodb使用instagram数据库

* sudo mkdir -p /data/db
* mongod --dbpath /data/db
* `无权限使用 sudo mongod --dbpath /data/db`
* `打开另一个命令行窗口`
* mongodb
* use instagram

## 运行web项目

> 安装依赖

`yarn install`

> 启动

`npm run start`