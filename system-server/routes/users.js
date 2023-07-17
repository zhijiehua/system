/*
 * @Description: 用户
 * @Author: huazj
 * @Date: 2023-07-02 15:50:58
 * @LastEditTime: 2023-07-17 22:49:41
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
    
  } else {
    ctx.fail('用户编码不能重复')
  }
  
})

module.exports = router;