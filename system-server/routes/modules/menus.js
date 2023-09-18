/*
 * @Description: 菜单
 * @Author: huazj
 * @Date: 2023-07-02 15:51:09
 * @LastEditTime: 2023-09-14 21:54:15
 * @LastEditors: huazj
 */
const Router = require('koa-router');
const router = new Router();

const { searchSQL, addSQL, updateSql, deleteSQL } = require('../../db/dbServes/menus');

// 获取列表
router.post('/getList', async (ctx, next) => {
  const params = ctx.request.body;
  const dbData = await searchSQL(params);
  ctx.dbData = dbData;
  next();
})

// 新增
router.put('/addMenus', async (ctx, next) => {
  const params = ctx.request.body;
  const dbData = await addSQL(params);
  tx.dbData = {...dbData, results: dbData.code === 200? null: dbData.results};
  next();
})

// 修改
router.put('/updateMenus', async (ctx, next) => {
  const params = ctx.request.body;
  const dbData = await updateSql(params);
  tx.dbData = {...dbData, results: dbData.code === 200? null: dbData.results};
  next();
})

// 删除
router.delete('/deleteMenus', async (ctx, next) => {
  const params = ctx.query;
  const dbData = await deleteSQL(params);
  ctx.dbData = {...dbData, results: dbData.code === 200? null: dbData.results};
  next()
})

module.exports = router;