import {Controller} from 'egg';

export default class Test extends Controller {
  async list() {
    const {ctx} = this
    try {
      // 存储用户账号密码
      let {username, password} = ctx.query
      let userJson = {
        username,
        password
      }
      ctx.service.test.addUser(userJson)
      ctx.body = 'hello world';
    } catch(err) {
      console.log(err)
    }
  }
}