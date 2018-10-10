import {Controller} from 'egg';

export default class Test extends Controller {
  async list() {
    const {ctx} = this
    try {
      var response = await ctx.service.test.list()
      await this.ctx.render('news/list.tpl', response)
    } catch(err) {
      console.log(err)
    }
  }
}