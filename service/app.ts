
// const uuid = require('uuid');

// module.exports = app => {

//   const localHandler = async (ctx, { username, password }) => {
//     const getUser = username => {
//       if (username.indexOf('@') > 0) {
//         return ctx.service.user.getUserByMail(username);
//       }
//       return ctx.service.user.getUserByLoginName(username);
//     };
//     const existUser = await getUser(username);

//     // 用户不存在
//     if (!existUser) {
//       return null;
//     }

//     const passhash = existUser.password;
//     // TODO: change to async compare
//     const equal = passhash == password
//     // 密码不匹配
//     if (!equal) {
//       return null;
//     }

//     // 验证通过
//     return existUser;
//   };

//   app.passport.verify(async (ctx, user) => {
//     ctx.logger.debug('passport.verify', user);
//     const handler = localHandler;
//     const existUser = await handler(ctx, user);
//     if (existUser) {
//       // id存入Cookie, 用于验证过期.
//       const auth_token = existUser.userId + '$$$$'; // 以后可能会存储更多信息，用 $$$$ 来分隔
//       const opts = {
//         path: '/',
//         maxAge: 1000 * 60 * 60 * 24 * 30,
//         signed: true,
//         httpOnly: true,
//       };
//       ctx.cookies.set(app.config.auth_cookie_name, auth_token, opts); // cookie 有效期30天
//     }

//     return existUser;
//   });
// };