import { Service } from 'egg';

/**
 * Service
 */
interface AddUserParams {
  username: string,
  password: string,
  mobile: number,
  email: string
}

export default class Test extends Service {

    /**
     * sayHi to you
     * @param name - your name
     */
    public async register(user: AddUserParams) {
        const {ctx} = this

        // 是否可以查询到
        const queryResult = await this.hasRegister(user.username)
        if (queryResult) {
            ctx.throw(400, '用户已注册');
        }
        
        const userInfo = await this.ctx.model.User.create(user);
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
