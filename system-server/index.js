/*
 * @Description: 
 * @Author: huazj
 * @Date: 2023-07-02 13:12:01
 * @LastEditTime: 2024-04-24 21:50:38
 * @LastEditors: huazj
 */

Date.prototype.Format = function (fmt) {
  var dt = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'S+': this.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var o in dt) {
    if (new RegExp('(' + o + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? dt[o] : ('00' + dt[o]).substr(('' + dt[o]).length));
    }
  }
  return fmt;
};

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