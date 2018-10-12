import { Controller } from 'egg'

class UserController extends Controller {
    /**
     * H5 注册/登录/找回密码
     * @return {Promise<*>}
     */

    // 注册
    public async register () {
        const {ctx} = this;
        const {mobile, password, code, username, email} = ctx.request.body

        // 参数校验
        if (!mobile || !password) {
            ctx.throw(400, '手机号或者密码不能为空');
        } else if (!code) {
            ctx.throw(400, '验证码不能为空');
        } else if (!username) {
            ctx.throw(400, '用户名为空');
        } else if (!email) {
            ctx.throw(400, '邮箱地址为空');
        }

        // 注册成功返回体
        const user = await ctx.service.user.register({
            mobile,
            password,
            username,
            email
        });

        // 注册成功，返回userid给前端
        ctx.status = 200;
        ctx.body = {
            data: {
                user_id: user.user_id
            },
            message: '恭喜您注册成功',
            success: true
        }
    }
}

module.exports = UserController
