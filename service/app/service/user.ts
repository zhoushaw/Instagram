import { Service } from 'egg';
const uuid = require('uuid');

/**
 * Service
 */

interface RegisterParams {
  username: string,
  password: string,
  mobile: number,
  email: string,
  user_id?: string
}

export default class UserService extends Service {

    /**
     * 
     * @interface RegisterParams - your name
     * @param  username // 用户名
     * @param  password // 密码
     * @param  mobile // 手机号
     * @param  email // 邮箱
     */
    public async register(user: RegisterParams) {
        const {ctx} = this
        
        // 添加uuid
        user.user_id = uuid.v4()

        // 是否可以查询到
        const queryResult = await this.hasRegister(user.username)
        if (queryResult) {
            ctx.throw(400, '用户已注册');
        }
        
        const userInfo = await this.ctx.model.User.create(user);

        // 注册成功，返回userid给前端
        ctx.status = 200;
        ctx.body = {
            data: {
                user_id: userInfo.dataValues.user_id
            },
            message: '恭喜您注册成功',
            success: true
        }
        return userInfo.dataValues;
    }


    // 查看是否已有注册
    private async hasRegister(username) {

        // 查询用户名
        const user = await this.ctx.model.User.findOne(
            {
            where: {username: username}
            }
        );

        if (user && user.dataValues.user_id) {
            return true;
        }

        return false;
    }
}
