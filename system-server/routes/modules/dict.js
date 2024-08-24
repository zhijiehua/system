/*
 * @Description: 
 * @Author: huazj
 * @Date: 2023-07-24 16:27:43
 * @LastEditTime: 2024-08-24 17:12:44
 * @LastEditors: huazj
 */
const Router = require('koa-router');
const router = new Router();

const { searchSQL, addSQL, updateSQL, updateStatus, deleteSQL, addItemSQL, updateItemSQL, getDictItemSQL, deleDictItemSQL } = require('../../db/dbServes/dict');

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
  ctx.dbData = { ...dbData, results: dbData.code === 200 ? null : dbData.results };
  next()
})

// 改变状态
router.put('/updateStatus', async (ctx, next) => {
  const params = ctx.request.body;
  const dbData = await updateStatus(params);
  ctx.dbData = { ...dbData, results: dbData.code === 200 ? null : dbData.results };
  next()
})

// 删除
router.delete('/deleDicts', async (ctx, next) => {
  const params = ctx.query;
  const dbData = await deleteSQL(params);
  ctx.dbData = { ...dbData, results: dbData.code === 200 ? null : dbData.results };
  next()
})

// 添加字典项
router.put('/addDictItems', async (ctx, next) => {
  const params = ctx.request.body;
  const dbData = await addItemSQL(params);
  ctx.dbData = { ...dbData, results: dbData.code === 200 ? null : dbData.results };
  next()
})

// 修改字典项
router.put('/updateDictItems', async (ctx, next) => {
  const params = ctx.request.body;
  const dbData = await updateItemSQL(params);
  ctx.dbData = { ...dbData, results: dbData.code === 200 ? null : dbData.results };
  next()
})

// 查询字典项
router.get('/getDictItems', async (ctx, next) => {
  const params = ctx.query;
  const dbData = await getDictItemSQL(params);
  ctx.dbData = {
    code: 200,
    results: ['1', '2', '3']
  };
  next()
})

// 删除字典项
router.delete('/deleDictItems', async (ctx, next) => {
  const params = ctx.query;
  const dbData = await deleDictItemSQL(params);
  ctx.dbData = { ...dbData, results: dbData.code === 200 ? null : dbData.results };
  next()
})

module.exports = router;