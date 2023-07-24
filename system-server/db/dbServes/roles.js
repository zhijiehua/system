/*
 * @Description: 角色管理
 * @Author: huazj
 * @Date: 2023-07-18 00:40:31
 * @LastEditTime: 2023-07-24 16:38:41
 * @LastEditors: huazj
 */
const db = require('../../db/mysql');
const {createId, toCamel} = require('../../utils/common');

const serves = {
  /**
   * @description: 查询
   * @return {*}
   */  
  searchSQL: async ({current, size, roleName = '', roleCode = ''}) => {
    const begin = size * (current - 1);
    const end = begin + size;
    let total = await db.query("select count(*) as total from roles");
    let data = await db.query(
      "select * from roles where (role_name = ? or ? = '') and (role_code = ? or ? = '') limit ? , ?",
      [roleName, roleName, roleCode, roleCode, begin, end,]
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
    const {roleName, roleCode, roleDesc} = params;
    const {results} = await db.query('select role_code from roles where role_code = ?', [roleCode]);
    if(results.length !== 0) {
      return {code: 400, results: '角色编码不能重复'}
    } 
    const data = await db.query(`INSERT INTO roles (id, role_name, role_code, role_desc)
    VALUES (?, ?, ?, ?)`, [createId(), roleName, roleCode, roleDesc]);
    return data
  },
  /**
   * @description: 修改
   * @return {*}
   */  
  updateSQL: async (params) => {
    const {roleName, roleCode, roleDesc, id} = params;
    const data = await db.query(
      `update roles set role_name = ?, role_code = ?, role_desc = ? where id = ?`, [roleName, roleCode, roleDesc, id]);
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