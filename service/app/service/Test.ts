import { Service } from 'egg';

/**
 * Test Service
 */
export default class Test extends Service {

  /**
   * sayHi to you
   * @param name - your name
   */
  public async addUser() {
    // INSERT
    const result = await this.app.mysql.insert('test', { account: 'Hello World', password: '123456' })
    console.log(result.affectedRows === 1 && '插入成功')
    // const result = await this.mysql.insert('posts', { title: 'Hello World' }); //insert a record title 'Hello World' to 'posts' table
  }
}
