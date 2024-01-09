/*
 * @Description: 
 * @Author: huazj
 * @Date: 2023-07-02 13:12:01
 * @LastEditTime: 2024-01-05 20:15:35
 * @LastEditors: huazj
 */
const Koa = require('koa');
const app = new Koa();
const path = require('path');
const bodyParser = require('koa-bodyparser');

const router = require('./routes');
const { routerResponse, sendInfo } = require('./utils/common.js');

const static = require('koa-static')   //静态资源服务插件
// 配置静态资源
const staticPath = './public/upload'
app.use(static(
  path.join( __dirname, staticPath)
))

app.use(bodyParser());

app.use(routerResponse({//返回结果
  failCode: 500,
  successCode: 200
}))
app.use(router.routes()).use(router.allowedMethods());
app.use(sendInfo());
app.listen(3000);