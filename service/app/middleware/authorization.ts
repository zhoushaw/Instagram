
const jwt = require('jsonwebtoken');

module.exports = (option, app) => {
  return async function (ctx, next) {
    // 在授权配置白名单内，跳过授权校验
    if (app.config.authWhiteList.indexOf(ctx.url) !== -1) {
      await next(option)
      return
    }
    
    if (ctx.cookies.get('token')) {
      let token = ctx.cookies.get('token')
      //解码token
      try {
        let decoded = jwt.verify(token, app.config.jwtSecret);
        console.log(decoded)
      } catch (error) {
        if (error.name == 'TokenExpiredError') {
          //重新发放令牌
          token = jwt.sign({
            user_id: 1
          }, app.config.jwtSecret, {
            expiresIn: '10s' //过期时间设置为60妙。那么decode这个token的时候得到的过期时间为 : 创建token的时间 +　设置的值
          });
          ctx.cookies.set('token', token, {
            maxAge: 60 * 1000,
            httpOnly: false,
            overwrite: true,
            signed: false
          });
        } else {
          ctx.returnBody(401, "you don't access to get data")
          return;
        }
      }
      await next(option);
    } else {
      ctx.returnBody(401, "you don't access to get data")
      return;
    }
  }
};
