/*
 * @Description: 公共接口
 * @Author: huazj
 * @Date: 2023-07-27 22:19:53
 * @LastEditTime: 2023-07-28 00:08:07
 * @LastEditors: huazj
 */
const Router = require('koa-router');
const router = new Router();

const multer = require('@koa/multer');
const upload = multer({dest: 'public/upload/'});

// 上传文件
router.post('/uploadFile', upload.single('file'), async (ctx, next) => {
  ctx.dbData = {code: 200, results: ctx.file.path};
  next()
})

module.exports = router;