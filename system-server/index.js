/*
 * @Description: 
 * @Author: huazj
 * @Date: 2023-07-02 13:12:01
 * @LastEditTime: 2023-07-17 22:49:08
 * @LastEditors: huazj
 */
const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');

const router = require('./routes');
const { routerResponse } = require('./utils/common.js');

app.use(bodyParser());
app.use(routerResponse({
  failCode: 500,
  successCode: 200
}))
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);