/*
 * @Description: 路由入口
 * @Author: huazj
 * @Date: 2023-07-03 20:14:17
 * @LastEditTime: 2023-07-17 23:12:47
 * @LastEditors: huazj
 */
const Router = require('koa-router');
const router = new Router();

const usersRouter = require('./users');
const menusRouter = require('./menus');
const rolesRouter = require('./roles');

router.prefix('/api');
// 用户管理
router.use('/users', usersRouter.routes(), usersRouter.allowedMethods());
// 菜单管理
router.use('/menus', menusRouter.routes(), menusRouter.allowedMethods());
// 角色管理
router.use('/roles', rolesRouter.routes(), menusRouter.allowedMethods());

module.exports = router;