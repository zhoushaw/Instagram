

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
        ctx.jwt.verify(token, app.config.jwtSecret);
      } catch (error) {
        ctx.returnBody(401, "您未登录，请登录后再试")
        return;
      }
      await next(option);
    } else {
      ctx.returnBody(401, "您未登录，请登录后再试")
      return;
    }
  }
};
