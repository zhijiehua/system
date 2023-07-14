/*
 * @Description: 用户
 * @Author: huazj
 * @Date: 2023-07-02 15:50:58
 * @LastEditTime: 2023-07-03 20:35:33
 * @LastEditors: huazj
 */
const Router = require('koa-router');
const router = new Router();

router.get('/test', (ctx, next) => {
  ctx.query;        // get请求获取参数
  ctx.request.body; // post请求获取参数
  ctx.body = {
    test: '用户'
  }
})

module.exports = router;