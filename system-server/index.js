/*
 * @Description: 
 * @Author: huazj
 * @Date: 2023-07-02 13:12:01
 * @LastEditTime: 2023-07-28 00:45:44
 * @LastEditors: huazj
 */
const Koa = require('koa');
const app = new Koa();
const path = require('path');
const bodyParser = require('koa-bodyparser');
const KoaStatic = require('koa-static');
const mount = require('koa-mount');

const router = require('./routes');
const { routerResponse, sendInfo } = require('./utils/common.js');

app.use(bodyParser());
app.use(mount('/teacher', KoaStatic('./public/upload')))

app.use(routerResponse({//返回结果
  failCode: 500,
  successCode: 200
}))
app.use(router.routes()).use(router.allowedMethods());
app.use(sendInfo());
app.listen(3000);