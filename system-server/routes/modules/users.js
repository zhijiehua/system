/*
 * @Description: 用户
 * @Author: huazj
 * @Date: 2023-07-02 15:50:58
 * @LastEditTime: 2023-07-29 17:36:48
 * @LastEditors: huazj
 */
const Router = require('koa-router');
const router = new Router();

const { searchSQL, addSQL, updateSQL, deleteSQL, updateStatus, updatePassword } = require('../../db/dbServes/users');

// 获取列表
router.post('/getList', async (ctx, next) => {
  const params = ctx.request.body;
  const dbData = await searchSQL(params);
  ctx.dbData = dbData;
  next()
})

// 新增
router.put('/addUsers', async (ctx, next) => {
  const params = ctx.request.body;
  const dbData = await addSQL(params);
  ctx.dbData = {...dbData, results: dbData.code === 200? null: dbData.results};
  next()
})

// 修改
router.put('/updateUsers', async (ctx, next) => {
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

// 删除
router.delete('/deleUsers', async (ctx, next) => {
  const params = ctx.query;
  const dbData = await deleteSQL(params);
  ctx.dbData = {...dbData, results: dbData.code === 200? null: dbData.results};
  next()
})

// 修改密码
router.put('/updatePassword', async (ctx, next) => {
  const params = ctx.request.body;
  const dbData = await updatePassword(params);
  ctx.dbData = {...dbData, results: dbData.code === 200? null: dbData.results};
  next() 
})

module.exports = router;