/*
 * @Description: 
 * @Author: huazj
 * @Date: 2023-07-02 13:12:01
 * @LastEditTime: 2023-07-03 20:37:08
 * @LastEditors: huazj
 */
const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');

const router = require('./routes');

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);