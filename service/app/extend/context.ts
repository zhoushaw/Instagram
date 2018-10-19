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
  },
  /**
   * 驼峰转下划线
   * @param obj // 转换对象
   * @return newObj // 返回转换完成的新对象
   */
  humpToUnderline (obj) {
    let newKey = obj.keys()
    let newObj = {}
    let humpReg = /([A-Z])/g

    newKey.forEach((item) => {
      newObj[item.replace(humpReg,"_$1").toLowerCase()] = obj[item]
    })
    return newObj
  }
};
