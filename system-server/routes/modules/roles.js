/*
 * @Description: 角色管理
 * @Author: huazj
 * @Date: 2023-07-17 22:38:08
 * @LastEditTime: 2023-07-29 17:37:38
 * @LastEditors: huazj
 */
const Router = require('koa-router');
const router = new Router();

const { searchSQL, addSQL, updateSQL, deleteSQL } = require('../../db/dbServes/roles');

// 获取列表
router.post('/getList', async (ctx, next) => {
  const params = ctx.request.body;
  const dbData = await searchSQL(params);
  ctx.dbData = dbData;
  next()
})

// 新增
router.put('/addRoles', async (ctx, next) => {
  const params = ctx.request.body;
  const dbData = await addSQL(params);
  ctx.dbData = {...dbData, results: dbData.code === 200? null: dbData.results};
  next()
})

// 修改
router.put('/updateRoles', async (ctx, next) => {
  const params = ctx.request.body;
  const dbData = await updateSQL(params);
  ctx.dbData = {...dbData, results: dbData.code === 200? null: dbData.results};
  next()
})

// 删除
router.delete('/deleRoles', async (ctx, next) => {
  const params = ctx.query;
  const dbData = await deleteSQL(params);
  ctx.dbData = {...dbData, results: dbData.code === 200? null: dbData.results};
  next()
})



module.exports = router;