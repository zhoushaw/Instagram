import { Controller } from 'egg'

/**
 * 工具controller
 */

class HandlerController extends Controller {

    public async getQiniuToken () {
        const {ctx} = this
        let token = await ctx.service.qiniu.getQiniuToken()
        ctx.returnBody(200, "获取token成功", {
            token: token,
            baseUrl: 'http://piyhxgz90.bkt.clouddn.com'
        })
    }

    public async uploadImage () {
        const {ctx} = this
        const stream = await ctx.getFileStream()
        await ctx.service.qiniu.upload(stream)
    }
}

module.exports = HandlerController
