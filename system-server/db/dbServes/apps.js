/*
 * @Description: 应用管理
 * @Author: huazj
 * @Date: 2023-07-27 20:35:13
 * @LastEditTime: 2023-07-28 12:46:20
 * @LastEditors: huazj
 */
const db = require('../../db/mysql');
const {createId, toCamel} = require('../../utils/common');

const serves = {
  /**
   * @description: 查询
   * @return {*}
   */  
  searchSQL: async ({current, size, appName = '', appCode = ''}) => {
    const begin = size * (current - 1);
    const end = begin + size;
    let total = await db.query("select count(*) as total from apps");
    let data = await db.query(
      "select * from apps where (app_name = ? or ? = '') and (app_code = ? or ? = '') limit ? , ?",
      [appName, appName, appCode, appCode, begin, end,]
    );
    if(total.code === 200 && data.code === 200) {
        return {
          code: 200,
          results: {
            total: total.results[0].total,
            records: toCamel(data.results)
          }
        }
    } else {
      return {
        code: 400,
        results: 'SQL异常'
      }
    }
  },
  /**
   * @description: 添加
   * @return {*}
   */  
  addSQL: async (params) => {
    const {appCode, appName, appStatus, appUrl, appIcon = '假的'} = params;
    const {results} = await db.query('select app_code from apps where app_code = ?', [appCode]);
    if(results.length !== 0) {
      return {code: 400, results: '应用编码不能重复'}
    } 
    const data = await db.query(`INSERT INTO apps (id, app_name, app_code, app_status, app_url, app_icon)
    VALUES (?, ?, ?, ?, ?, ?)`, [createId(), appName, appCode, appStatus ,appUrl, appIcon]);
    return data
  },
  /**
   * @description: 修改
   * @return {*}
   */  
  updateSQL: async (params) => {
    const {appCode, appName, appStatus, appUrl, appIcon, id} = params;
    const data = await db.query(
      `update apps set app_name = ?, app_code = ?, app_status = ?, app_url = ?, app_icon = ? where id = ?`, [appName, appCode, appStatus, appUrl, appIcon, id]);
    return data
  },
  /**
   * @description: 修改状态
   * @return {*}
   */  
  updateStatus: async (params) => {
    const {appStatus, id} = params;
    const data = await db.query(
      `update apps set app_status = ? where id = ?`, [appStatus, id]);
    return data
  },
  /**
   * @description: 删除
   * @return {*}
   */  
  deleteSQL: async (params) => {
    const {id} = params;
    const data = await db.query(`delete from apps where id = ?`, [id]);
    return data;
  },
}

module.exports = serves;