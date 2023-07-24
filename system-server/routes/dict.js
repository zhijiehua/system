/*
 * @Description: 
 * @Author: huazj
 * @Date: 2023-07-24 16:27:43
 * @LastEditTime: 2023-07-24 18:12:53
 * @LastEditors: huazj
 */
const Router = require('koa-router');
const router = new Router();

const { searchSQL, addSQL, updateSQL, updateStatus, deleteSQL} = require('../db/dbServes/dict');

// 获取列表
router.post('/getList', async (ctx, next) => {
  const params = ctx.request.body;
  const searchData = await searchSQL(params);
  if(searchData.code === 200) {
    ctx.success(searchData.results, '操作成功');
  } else {
    ctx.fail(searchData.results);
  }
})

// 新增
router.put('/addDicts', async (ctx, next) => {
  const params = ctx.request.body;
  const dbData = await addSQL(params);
  if(dbData.code === 200) {
    ctx.success(null, '操作成功');
  } else {
    ctx.fail(dbData.results);
  }
})

// 修改
router.put('/updateDicts', async (ctx, next) => {
  const params = ctx.request.body;
  const dbData = await updateSQL(params);
  if(dbData.code === 200) {
    ctx.success(null, '操作成功');
  } else {
    ctx.fail(dbData.results);
  }
})

// 改变状态
router.put('/updateStatus', async (ctx, next) => {
  const params = ctx.request.body;
  const dbData = await updateStatus(params);
  if(dbData.code === 200) {
    ctx.success(null, '操作成功');
  } else {
    ctx.fail(dbData.results);
  }
})

// 删除
router.delete('/deleDicts', async (ctx, next) => {
  const params = ctx.query;
  deleteSQL(params);
  ctx.success(null, '操作成功');
})

module.exports = router;