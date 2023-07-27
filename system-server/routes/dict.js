/*
 * @Description: 
 * @Author: huazj
 * @Date: 2023-07-24 16:27:43
 * @LastEditTime: 2023-07-27 12:56:23
 * @LastEditors: huazj
 */
const Router = require('koa-router');
const router = new Router();

const { searchSQL, addSQL, updateSQL, updateStatus, deleteSQL, addItemSQL, updateItemSQL, getDictItemSQL, deleDictItemSQL} = require('../db/dbServes/dict');

// 获取列表
router.post('/getList', async (ctx, next) => {
  const params = ctx.request.body;
  const dbData = await searchSQL(params);
  ctx.dbData = dbData;
  next()
})

// 新增
router.put('/addDicts', async (ctx, next) => {
  const params = ctx.request.body;
  const dbData = await addSQL(params);
  ctx.dbData = dbData;
  next()
})

// 修改
router.put('/updateDicts', async (ctx, next) => {
  const params = ctx.request.body;
  const dbData = await updateSQL(params);
  ctx.dbData = dbData;
  next()
})

// 改变状态
router.put('/updateStatus', async (ctx, next) => {
  const params = ctx.request.body;
  const dbData = await updateStatus(params);
  ctx.dbData = dbData;
  next()
})

// 删除
router.delete('/deleDicts', async (ctx, next) => {
  const params = ctx.query;
  const dbData = deleteSQL(params);
  ctx.dbData = dbData;
  next()
})

// 添加字典项
router.put('/addDictItems', async (ctx, next) => {
  const params = ctx.request.body;
  const dbData = await addItemSQL(params);
  ctx.dbData = dbData;
  next()
})

// 修改字典项
router.put('/updateDictItems', async (ctx, next) => {
  const params = ctx.request.body;
  const dbData = await updateItemSQL(params);
  ctx.dbData = dbData;
  next()
})

// 查询字典项
router.get('/getDictItems', async (ctx, next) => {
  const params = ctx.query;
  const dbData = await getDictItemSQL(params);
  ctx.dbData = dbData;
  next()
})

// 删除字典项
router.delete('/deleDictItems', async (ctx, next) => {
  const params = ctx.query;
  const dbData = await deleDictItemSQL(params);
  ctx.dbData = dbData;
  next()
})

module.exports = router;