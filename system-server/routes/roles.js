/*
 * @Description: 角色管理
 * @Author: huazj
 * @Date: 2023-07-17 22:38:08
 * @LastEditTime: 2023-07-20 21:48:03
 * @LastEditors: huazj
 */
const Router = require('koa-router');
const router = new Router();

const { toCamel } = require('../utils/common');
const { search, add } = require('../db/dbServes/roles');

// 获取列表
router.post('/getList', async (ctx, next) => {
  const params = ctx.request.body;
  const searchData = await search(params);
  if(searchData.code === 200) {
    ctx.success(toCamel(searchData.results), '操作成功');
  } else {
    ctx.fail(searchData.results);
  }
})

// 新增
router.put('/addRoles', async (ctx, next) => {
  const params = ctx.request.body;
  const dbData = await add(params);
  if(dbData.code === 200) {
    ctx.success(null, '操作成功');
  } else {
    ctx.fail(dbData.results);
  }
})

// 删除
router.delete('/delRoles', async (ctx, next) => {
  const params = ctx.request.body;
  console.log(params);
  ctx.success(null, '操作成功');
})



module.exports = router;