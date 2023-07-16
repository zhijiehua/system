/*
 * @Description: 用户
 * @Author: huazj
 * @Date: 2023-07-02 15:50:58
 * @LastEditTime: 2023-07-17 01:03:03
 * @LastEditors: huazj
 */
const Router = require('koa-router');
const router = new Router();

const { search, add } = require('../db/dbServes/users');

router.post('/test', async (ctx, next) => {
  const params = ctx.request.body;
  const searchData = await search(params);
  if(searchData.results.length === 0) {
    add(params);
    ctx.body = {
      test: '用户',
      code: 200
    }
  } else {
    ctx.body = {
      test: '用户',
      code: 400 
    }
  }
  
})

module.exports = router;