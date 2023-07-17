/*
 * @Description: 
 * @Author: huazj
 * @Date: 2023-07-17 00:59:54
 * @LastEditTime: 2023-07-18 01:16:46
 * @LastEditors: huazj
 */
module.exports = {
  /**
   * @description: 返回给前端
   * @return {*}
   */  
  routerResponse: (option={}) => {
      return async (ctx,next) =>{
        ctx.success = (data,message) => {
          ctx.type = option.type || 'json'
          ctx.body = 
          {
            code : option.successCode || 0,
            message : message,
            data : data
          }
        }
        ctx.fail = (message,code) => {
          ctx.type = option.type || 'json'
          ctx.body = {
            code : code || option.failCode || 99,
            message : message || option.successmessage || 'fail',
          }
        }
        try {
          await next()
        } catch (error) {
          ctx.body = {
            code: 500,
            message: '服务器内部异常'
          }
        }
      }
    }

}