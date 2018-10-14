import { Controller } from 'egg'

class UserController extends Controller {
    /**
     * H5 注册/登录/找回密码
     * @return {Promise<*>}
     */

    // 注册
    public async register () {
        const {ctx} = this;
        const {mobile, password, username, email} = ctx.request.body

        // 错误处理
        if (!this.__errNotice) return

        // 注册成功返回体
        await ctx.service.user.register({ mobile, password, username, email});

    }

    // 登录
    public async loginIn () {
        const {ctx} = this;
        const {password, username} = ctx.request.body

        // 登录
        const existUser = await this.__localHandler({password, username});

        // set cookie
        if (existUser) {
            // id存入Cookie, 用于验证过期.
            const auth_token = existUser.user_id + '$$$$'; // 以后可能会存储更多信息，用 $$$$ 来分隔
            const opts = {
                path: '/',
                maxAge: 1000 * 60 * 60 * 24 * 30,
                signed: true,
                httpOnly: true,
            };
            ctx.cookies.set(this.config.auth_cookie_name, auth_token, opts); // cookie 有效期30天
            ctx.returnBody(200, "登录成功")
        } else {
            ctx.throw(400, '用户名或密码错误')
        }
    }

    // 退出登录
    public async signOut () {
        const { ctx } = this;
        ctx.logout();
        ctx.returnBody(200, "退出登录成功")
    }

    // 登录处理函数
    public async __localHandler ({ username, password }) {
        const {ctx} = this
        const getUser = username => {
            if (username.indexOf('@') > 0) {
                return ctx.service.user.getUserByMail(username);
            }
            return ctx.service.user.getUserByLoginName(username);
        };
        const existUser = await getUser(username);

        // 用户不存在
        if (!existUser) {
            return null
        }

        const passhash = existUser.password;
        // TODO: change to async compare
        const equal = passhash == password
        // 密码不匹配
        if (!equal) {
            return false
        }

        // 验证通过
        return existUser;
    }

    // 参数异常函数
    private __errNotice () {
        const {ctx} = this;
        const {mobile, password, code, username, email} = ctx.request.body
        // 参数校验
        let message;
        if (!mobile || !email) {
            message = '手机号或者邮箱不能为空'
        } else if (!code) {
            message = '验证码不能为空'
        } else if (!username) {
            message = '用户名为空'
        } else if (!password) {
            message = '密码不能为空'
        }

        // 抛出异常
        if (message) {
            ctx.throw(400, message);
            return false
        }
        return true
    }
}

module.exports = UserController
