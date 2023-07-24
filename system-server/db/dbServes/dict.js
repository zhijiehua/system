/*
 * @Description: 字典
 * @Author: huazj
 * @Date: 2023-07-24 16:34:22
 * @LastEditTime: 2023-07-24 21:53:45
 * @LastEditors: huazj
 */
const db = require('../../db/mysql');
const { param } = require('../../routes');
const {createId, toCamel} = require('../../utils/common');

const serves = {
  /**
   * @description: 查询
   * @return {*}
   */  
  searchSQL: async ({current, size, dictName = '', dictCode = ''}) => {
    const begin = size * (current - 1);
    const end = begin + size;
    let total = await db.query("select count(*) as total from dicts");
    let data = await db.query(
      "select * from dicts where (dict_name = ? or ? = '') and (dict_code = ? or ? = '') limit ? , ?",
      [dictName, dictName, dictCode, dictCode, begin, end,]
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
    const {dictName, dictCode, dictStatus, dictDesc} = params;
    const {results} = await db.query('select dict_code from dicts where dict_code = ?', [dictCode]);
    if(results.length !== 0) {
      return {code: 400, results: '字典编码不能重复'}
    } 
    const data = await db.query(`INSERT INTO dicts (id, dict_name, dict_code, dict_status, dict_desc)
    VALUES (?, ?, ?, ?, ?)`, [createId(), dictName, dictCode, dictStatus ,dictDesc]);
    return data
  },
  /**
   * @description: 修改
   * @return {*}
   */  
  updateSQL: async (params) => {
    const {dictName, dictCode, dictStatus, dictDesc, id} = params;
    const data = await db.query(
      `update dicts set dict_name = ?, dict_code = ?, dict_status = ? ,dict_desc = ? where id = ?`, [dictName, dictCode, dictStatus, dictDesc, id]);
    return data
  },
  /**
   * @description: 修改状态
   * @return {*}
   */  
  updateStatus: async (params) => {
    const {dictStatus, id} = params;
    const data = await db.query(
      `update dicts set dict_status = ? where id = ?`, [dictStatus, id]);
    return data
  },
  /**
   * @description: 删除
   * @return {*}
   */  
  deleteSQL: async (params) => {
    const {id} = params;
    const data = await db.query(`delete from dicts where id = ?`, [id]);
    return data;
  }
}

module.exports = serves;