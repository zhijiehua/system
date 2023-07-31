/*
 * @Description: 应用管理
 * @Author: huazj
 * @Date: 2023-07-27 20:34:19
 * @LastEditTime: 2023-07-29 17:37:25
 * @LastEditors: huazj
 */
const Router = require('koa-router');
const router = new Router();

const { searchSQL, addSQL, updateSQL, updateStatus, deleteSQL } = require('../../db/dbServes/apps');

// 获取应用列表
router.post('/getList', async (ctx, next) => {
  const params = ctx.request.body;
  const dbData = await searchSQL(params);
  ctx.dbData = dbData;
  next()
})

// 新增应用
router.put('/addApps', async (ctx, next) => {
  const params = ctx.request.body;
  const dbData = await addSQL(params);
  ctx.dbData = {...dbData, results: dbData.code === 200? null: dbData.results};
  next()
})

// 修改应用
router.put('/updateApps', async (ctx, next) => {
  const params = ctx.request.body;
  const dbData = await updateSQL(params);
  ctx.dbData = {...dbData, results: dbData.code === 200? null: dbData.results};
  next()
})

// 改变应用状态
router.put('/updateStatus', async (ctx, next) => {
  const params = ctx.request.body;
  const dbData = await updateStatus(params);
  ctx.dbData = {...dbData, results: dbData.code === 200? null: dbData.results};
  next()
})

// 删除应用
router.delete('/deleApps', async (ctx, next) => {
  const params = ctx.query;
  const dbData = await deleteSQL(params);
  ctx.dbData = {...dbData, results: dbData.code === 200? null: dbData.results};
  next()
})

module.exports = router;