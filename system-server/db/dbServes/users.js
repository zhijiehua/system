/*
 * @Description: 调用用户信息数据库
 * @Author: huazj
 * @Date: 2023-07-17 00:33:58
 * @LastEditTime: 2023-07-29 17:35:46
 * @LastEditors: huazj
 */
const db = require('../../db/mysql');
const {createId, toCamel} = require('../../utils/common');

const serves = {
  /**
   * @description: 查询
   * @return {*}
   */  
  searchSQL: async ({current, size, userName = '', userId = ''}) => {
    const begin = size * (current - 1);
    const end = begin + size;
    let total = await db.query("select count(*) as total from users");
    let data = await db.query(
      "select id, user_id, user_name, status, phone, email from users where (user_name = ? or ? = '') and (user_id = ? or ? = '') limit ? , ?",
      [userName, userName, userId, userId, begin, end,]
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
    const {userId, userName, status, phone, email} = params;
    const {results} = await db.query('select user_id from users where user_id = ?', [userId]);
    if(results.length !== 0) {
      return {code: 400, results: '用户帐号不能重复'}
    } 
    const data = await db.query(`INSERT INTO users (id, user_id, user_name, status, phone, email, password)
    VALUES (?, ?, ?, ?, ?, ?, ?)`, [createId(), userId, userName, status, phone, email, '123456']);
    return data
  },
  /**
   * @description: 修改
   * @return {*}
   */  
  updateSQL: async (params) => {
    const {userName, status, phone, email, id} = params;
    const data = await db.query(
      `update users set user_name = ?, status = ?, phone = ?, email = ? where id = ?`,
      [userName, status, phone, email , id]);
    return data
  },
  /**
   * @description: 修改状态
   * @return {*}
   */  
  updateStatus: async (params) => {
    const {status, id} = params;
    const data = await db.query(
      `update users set status = ? where id = ?`, [status, id]);
    return data
  },
  /**
   * @description: 删除
   * @return {*}
   */  
  deleteSQL: async (params) => {
    const {id} = params;
    const data = await db.query(`delete from users where id = ?`, [id]);
    return data;
  },
  /**
   * @description: 更新密码
   * @return {*}
   */  
  updatePassword: async (params) => {
    const {userId, password} = params;
    const data = await db.query(`update users set password = ? where user_id = ?`, [password, userId]);
    return data;
  }
  
}

module.exports = serves;