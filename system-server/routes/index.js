/*
 * @Description: 路由入口
 * @Author: huazj
 * @Date: 2023-07-03 20:14:17
 * @LastEditTime: 2023-07-03 20:17:46
 * @LastEditors: huazj
 */
const Router = require('koa-router');
const router = new Router();

const usersRouter = require('./users');
const menusRouter = require('./menus');

router.prefix('/api');
router.use('/users', usersRouter.routes(), usersRouter.allowedMethods());
router.use('/menus', menusRouter.routes(), menusRouter.allowedMethods());

module.exports = router;