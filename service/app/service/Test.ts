import { Service } from 'egg';

/**
 * Test Service
 */
interface AddUserParams {
  username: string,
  password: string
}
export default class Test extends Service {

  /**
   * sayHi to you
   * @param name - your name
   */
  public async addUser(userMsg: AddUserParams) {
    // INSERT
    let {username} = userMsg
    // 是否可以查询到
    await this.app.mysql.get('users', { username });
    
    // const result = await this.app.mysql.insert('users', { username: 'Hell', passwords: '123456' })
    // console.log(result.affectedRows === 1 && '插入成功')
    // const result = await this.mysql.insert('posts', { title: 'Hello World' }); //insert a record title 'Hello World' to 'posts' table
  }
}
