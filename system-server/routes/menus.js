/*
 * @Description: 菜单
 * @Author: huazj
 * @Date: 2023-07-02 15:51:09
 * @LastEditTime: 2023-07-18 01:16:34
 * @LastEditors: huazj
 */
const Router = require('koa-router');
const router = new Router();

const db = require('../db/mysql');

router.get('/test',  async (ctx, next) => {
  const data = await db.query("select * from users");
  ctx.body = {
    data
  }
})

module.exports = router;