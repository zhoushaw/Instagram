import { Controller } from 'egg'

/**
 * 工具controller
 */

class HandlerController extends Controller {
    public async uploadImag () {
        const {ctx} = this
        await ctx.service.qiniu.upload()
    }
}

module.exports = HandlerController
