/*
 * @Description: 路由入口
 * @Author: huazj
 * @Date: 2023-07-03 20:14:17
 * @LastEditTime: 2023-07-27 22:44:14
 * @LastEditors: huazj
 */
const Router = require('koa-router');
const router = new Router();

const usersRouter = require('./modules/users');
const menusRouter = require('./modules/menus');
const rolesRouter = require('./modules/roles');
const dictsRouter = require('./modules/dict');
const appsRouter = require('./modules/apps');
const commonRouter = require('./modules/common');

router.prefix('/api');
// 用户管理
router.use('/users', usersRouter.routes(), usersRouter.allowedMethods());
// 菜单管理
router.use('/menus', menusRouter.routes(), menusRouter.allowedMethods());
// 角色管理
router.use('/roles', rolesRouter.routes(), rolesRouter.allowedMethods());
// 字典管理
router.use('/dict', dictsRouter.routes(), dictsRouter.allowedMethods());
// 应用管理
router.use('/apps', appsRouter.routes(), appsRouter.allowedMethods());
// 公共接口
router.use('/common', commonRouter.routes(), commonRouter.allowedMethods());



module.exports = router;