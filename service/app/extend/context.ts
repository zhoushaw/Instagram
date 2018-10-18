const jwt = require('jsonwebtoken');
// 扩展一些框架便利的方法
module.exports = {
  get jwt() {
    return jwt
  },
  get user() {
    let token = this.cookies.get('token')
    let user = jwt.verify(token, this.app.config.jwtSecret);
    return user
  },
  /**
   * 返回客户端内容
   * @param status // 返回状态
   * @param message // 返回内容
   * @param data // 返回内容
   */
  returnBody (status, message, data = {}) {
    this.status = status
    this.body = {
      data,
      message: message,
      success: true
    }
  }
};
