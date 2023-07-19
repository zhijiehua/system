/*
 * @Description: 
 * @Author: huazj
 * @Date: 2023-07-17 00:59:54
 * @LastEditTime: 2023-07-19 23:32:52
 * @LastEditors: huazj
 */
const expostData = {
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
  },
  toCamel: (data) => {
    let results;
    const changeFun = (str) => {
      return str.replace(/([^_])(?:_+([^_]))/g, function ($0, $1, $2) {
        return $1 + $2.toUpperCase();
      });
    }
    if(Object.prototype.toString.call(data) === '[object Object]') {
      let copyData = {};
      Object.keys(data).map(item => {
        copyData[changeFun(item)] = data[item];
      })
      results = copyData;
    } else if(Object.prototype.toString.call(data) === '[object Array]'){
      let copyData = [];
      data.map(item => {
        copyData.push(expostData.toCamel(item));
      })
      results = copyData;
    } else {
      results = data;
    }
    return results;
  }
}
module.exports = expostData;