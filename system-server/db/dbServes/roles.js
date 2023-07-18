/*
 * @Description: 角色管理
 * @Author: huazj
 * @Date: 2023-07-18 00:40:31
 * @LastEditTime: 2023-07-18 10:36:01
 * @LastEditors: huazj
 */
const db = require('../../db/mysql');

const serves = {
  /**
   * @description: 查询
   * @return {*}
   */  
  search: async (params) => {
    let data = await db.query("select * from roles", []);
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