/*
 * @Description: 角色管理
 * @Author: huazj
 * @Date: 2023-07-18 00:40:31
 * @LastEditTime: 2023-07-20 21:33:48
 * @LastEditors: huazj
 */
const db = require('../../db/mysql');

const {createId} = require('../../utils/common');

const serves = {
  /**
   * @description: 查询
   * @return {*}
   */  
  search: async ({current, size, roleName, roleCode}) => {
    // console.log(params)
    let total = await db.query("select count(*) as total from roles where role_name = ?", ['admin']);
    console.log(total)
    let data = await db.query("select * from roles", []);
    return data
  },
  /**
   * @description: 添加
   * @return {*}
   */  
  add: async (params) => {
    const {roleName, roleCode, roleDesc} = params;
    const data = await db.query(`INSERT INTO roles (id, role_name, role_code, role_desc)
    VALUES (?, ?, ?, ?)`, [createId(), roleName, roleCode, roleDesc]);
    return data
  }
}

module.exports = serves;