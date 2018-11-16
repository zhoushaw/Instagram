import { Service } from 'egg';
const jwt = require('jsonwebtoken');
const uuid = require('uuid');

/**
 * Service
 */

interface RegisterParams {
  username: string,
  password: string,
  mobile?: number,
  email: string,
  userId?: string
}

interface LoginParams {
    email: string,
    password: string
}

export default class UserService extends Service {

    
    /**
     * @interface RegisterParams - your name
     * @param  username // 用户名
     * @param  password // 密码
     * @param  email // 邮箱
     */
    public async register(user: RegisterParams) {
        const {ctx} = this
        
        // 添加uuid
        user.userId = uuid.v4().replace(/-/g,'')

        // 是否可以查询到
        const queryResult = await this.hasRegister(user.email)
        if (queryResult) {
            ctx.returnBody(200, "邮箱已被使用", {
                flag: false  
            })
            return
        }
        
        const userInfo = await this.ctx.model.User.create(user);

        // 注册成功，返回userid给前端
        ctx.status = 200;
        ctx.returnBody(200, "注册成功", {
            userId: userInfo.dataValues.userId,
            flag: true  
        })
        return userInfo.dataValues;
    }

    /**
     * @interface LoginParams - your name
     * @param  username // 用户名
     * @param  password // 密码
     */
    public async login(user:LoginParams) {
        const {app} = this

        const existUser = await this.getUserByMail(user.email)

        // 用户不存在
        if (!existUser) {
            return null
        }

        const passhash = existUser.password;
        // TODO: change to async compare
        const equal = passhash == user.password
        // 密码不匹配
        if (!equal) {
            return false
        }

        // 验证通过
        const token = jwt.sign({userId: existUser.userId,}, app.config.jwtSecret, {expiresIn: '7d'});
        return token;
    }

    
    /**
     * @param  email // 邮箱
     */
    private async hasRegister(email) {

        // 查询用户名
        const user = await this.ctx.model.User.findOne({
            where: {email: email}
        });

        if (user && user.dataValues.userId) {
            return true;
        }

        return false;
    }
    
    /**
     * 根据userId查找用户
     * @param {String} loginName 登录名
     * @return {Promise[user]} 承载用户的 Promise 对象
     */
    public async getUserByUserId(userId) {
        const query = { userId: userId };
        return this.ctx.model.User.findOne({
            where: query
        })
    }

    /**
     * 根据邮箱，查找用户
     * @param {String} email 邮箱地址
     * @return {Promise[user]} 承载用户的 Promise 对象
     */
    public async getUserByMail(email) {
        return this.ctx.model.User.findOne({ 
            where: {
                email
            }
        })
    }

    /**
     * 更新用户数据
     * @param {String} email 邮箱地址
     * @return {Promise[user]} 承载用户的 Promise 对象
     */
    public async updateUserInfo(query, updateValue) {

        return this.ctx.model.User.update(updateValue, { 
            where: query
        })
    }


    /**
     * 查找除自己外的用户
     * @return {Promise[user]} 承载用户的 Promise 对象
     */
    public async getUserList(userId) {
        let {app} = this
        const Op = app.Sequelize.Op

        // 查询已关注用户
        let followList  = await this.ctx.model.Follow.findAll({
            attributes: ['userId'],
            where: {
                followedId: userId,
                status: 1
            }
        })

        // 处理数据
        followList = followList.map(item => {
            return item.userId
        })


        return this.ctx.model.User.findAll({
            attributes: ['userId', 'username', 'email', 'avatarUrl', 'abstract'],
            where: { 
                userId: {
                    [Op.ne]: userId, 
                    [Op.notIn]: followList
                }
            }
        })
    }
}
