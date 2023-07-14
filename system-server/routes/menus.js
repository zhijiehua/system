/*
 * @Description: 菜单
 * @Author: huazj
 * @Date: 2023-07-02 15:51:09
 * @LastEditTime: 2023-07-05 15:28:21
 * @LastEditors: huazj
 */
const Router = require('koa-router');
const router = new Router();

const db = require('../db/mysql');
console.log(db)

router.get('/test',  async (ctx, next) => {
  const data = await db.query("select * from users");
  console.log(data);
  ctx.body = {
    data
  }
})

module.exports = router;