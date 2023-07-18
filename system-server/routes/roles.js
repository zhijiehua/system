/*
 * @Description: 角色管理
 * @Author: huazj
 * @Date: 2023-07-17 22:38:08
 * @LastEditTime: 2023-07-18 10:35:09
 * @LastEditors: huazj
 */
const Router = require('koa-router');
const router = new Router();

const { search } = require('../db/dbServes/roles');

router.post('/getList', async (ctx, next) => {
  const params = ctx.request.body;
  const searchData = await search(params);
  if(searchData.code === 200) {
    ctx.success(searchData.results, '操作成功');
  } else {
    ctx.fail(searchData.results);
  }
  // if(searchData.results.length === 0) {
  //   // add(params);
    
  // } else {
  //   ctx.fail('用户编码不能重复')
  // }
})

module.exports = router;