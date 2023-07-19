/*
 * @Description: 角色管理
 * @Author: huazj
 * @Date: 2023-07-17 22:38:08
 * @LastEditTime: 2023-07-19 23:33:26
 * @LastEditors: huazj
 */
const Router = require('koa-router');
const router = new Router();

const { toCamel } = require('../utils/common');
const { search } = require('../db/dbServes/roles');

router.post('/getList', async (ctx, next) => {
  const params = ctx.request.body;
  const searchData = await search(params);
  if(searchData.code === 200) {
    ctx.success(toCamel(searchData.results), '操作成功');
  } else {
    ctx.fail(searchData.results);
  }
})

module.exports = router;