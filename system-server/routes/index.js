/*
 * @Description: 路由入口
 * @Author: huazj
 * @Date: 2023-07-03 20:14:17
 * @LastEditTime: 2023-07-24 16:30:22
 * @LastEditors: huazj
 */
const Router = require('koa-router');
const router = new Router();

const usersRouter = require('./users');
const menusRouter = require('./menus');
const rolesRouter = require('./roles');
const dictRouter = require('./dict');

router.prefix('/api');
// 用户管理
router.use('/users', usersRouter.routes(), usersRouter.allowedMethods());
// 菜单管理
router.use('/menus', menusRouter.routes(), menusRouter.allowedMethods());
// 角色管理
router.use('/roles', rolesRouter.routes(), rolesRouter.allowedMethods());
// 字典管理
router.use('/dict', dictRouter.routes(), dictRouter.allowedMethods());

module.exports = router;