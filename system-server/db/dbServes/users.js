/*
 * @Description: 调用用户信息数据库
 * @Author: huazj
 * @Date: 2023-07-17 00:33:58
 * @LastEditTime: 2023-07-17 00:52:58
 * @LastEditors: huazj
 */
const db = require('../../db/mysql');

const serves = {
  /**
   * @description: 查询
   * @return {*}
   */  
  search: async (params) => {
    const {accountId} = params;
    const data = await db.query("select * from users where account_id = ?", [accountId]);
    return data;
  },
  /**
   * @description: 添加
   * @return {*}
   */  
  add: async (params) => {
    const {userName, passWord, accountId} = params;
    const data = await db.query(`INSERT INTO users (user_name, pass_word, account_id)
    VALUES (?, ?, ?);`, [userName, passWord, accountId]);
  }
}

module.exports = serves;