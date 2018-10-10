import {Controller} from 'egg';

export default class Test extends Controller {
  async list() {
    const {ctx} = this
    try {
      // let successCode = await ctx.service.test.addUser()
      // console.log(successCode)
      ctx.service.test.addUser()
    } catch(err) {
      console.log(err)
    }
  }
}