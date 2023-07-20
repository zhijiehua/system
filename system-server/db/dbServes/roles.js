/*
 * @Description: 角色管理
 * @Author: huazj
 * @Date: 2023-07-18 00:40:31
 * @LastEditTime: 2023-07-21 00:27:42
 * @LastEditors: huazj
 */
const db = require('../../db/mysql');

const {createId} = require('../../utils/common');

const serves = {
  /**
   * @description: 查询
   * @return {*}
   */  
  searchSQL: async ({current, size, roleName, roleCode}) => {
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
  addSQL: async (params) => {
    const {roleName, roleCode, roleDesc} = params;
    const data = await db.query(`INSERT INTO roles (id, role_name, role_code, role_desc)
    VALUES (?, ?, ?, ?)`, [createId(), roleName, roleCode, roleDesc]);
    return data
  },
  /**
   * @description: 删除
   * @return {*}
   */  
  deleteSQL: async (params) => {
    const {id} = params;
    const data = await db.query(`delete from roles where id = ?`, [id]);
    return data;
  }
}

module.exports = serves;