/*
 * @Description: 
 * @Author: huazj
 * @Date: 2023-07-24 16:27:43
 * @LastEditTime: 2023-07-25 21:02:16
 * @LastEditors: huazj
 */
const Router = require('koa-router');
const router = new Router();

const { searchSQL, addSQL, updateSQL, updateStatus, deleteSQL, addItemSQL, updateItemSQL, getDictItemSQL, deleDictItemSQL} = require('../db/dbServes/dict');

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
  const dbData = deleteSQL(params);
  if(dbData.code === 200) {
    ctx.success(null, '操作成功');
  } else {
    ctx.fail(dbData.results);
  }
})

// 添加字典项
router.put('/addDictItems', async (ctx, next) => {
  const params = ctx.request.body;
  const dbData = await addItemSQL(params);
  if(dbData.code === 200) {
    ctx.success(null, '操作成功');
  } else {
    ctx.fail(dbData.results);
  }
})

// 修改字典项
router.put('/updateDictItems', async (ctx, next) => {
  const params = ctx.request.body;
  const dbData = await updateItemSQL(params);
  if(dbData.code === 200) {
    ctx.success(null, '操作成功');
  } else {
    ctx.fail(dbData.results);
  }
})

// 查询字典项
router.get('/getDictItems', async (ctx, next) => {
  const params = ctx.query;
  const dbData = await getDictItemSQL(params);
  if(dbData.code === 200) {
    ctx.success(dbData.results, '操作成功');
  }  else {
    ctx.fail(dbData.results);
  }
})

// 删除字典项
router.delete('/deleDictItems', async (ctx, next) => {
  const params = ctx.query;
  const dbData = await deleDictItemSQL(params);
  if(dbData.code === 200) {
    ctx.success(dbData.results, '操作成功');
  }  else {
    ctx.fail(dbData.results);
  }
})

module.exports = router;