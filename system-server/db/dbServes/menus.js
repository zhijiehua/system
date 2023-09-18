/*
 * @Description: 菜单管理
 * @Author: huazj
 * @Date: 2023-09-14 15:26:34
 * @LastEditTime: 2023-09-14 21:54:54
 * @LastEditors: huazj
 */
const db = require('../../db/mysql');
const { params } = require('../../routes/modules/menus');
const {createId, toCamel} = require('../../utils/common');

const serves = {
  /**
   * @description: 查询
   * @return {*}
   */  
  searchSQL: async ({menuName = '', parentId = ''}) => {
    let data = await db.query(
      "select * from menus where (menu_name = ? or ? = '') and parent_id = ?",
      [menuName, menuName, parentId]
    );
    if(data.code === 200) {
      return {
        code: 200,
        results: {
          code: 200,
          data: toCamel(data.results)
        }
      }
    } else {
      return {
        code: 400,
        results: data
      }
    }
  },
  /**
   * @description: 添加
   * @return {*}
   */  
  addSQL: async (params) => {
    let {
      menuType, // 菜单类型
      menuName, // 菜单名称
      menuPath, // 菜单路径
      menuRoot, // 权限标识
      menuSort, // 排序
      parentId // 父级id
    } = params;
    let findData = [];
    if(menuType === 1) {
      menuRoot = '';
      const {results} = await db.query('select menu_path from menus where menu_path = ? and parent_id = ?', [menuPath, parentId]);
      findData = results;
    } else {
      menuPath = '';
      const {results} = await db.query('select menu_root from menus where menu_root = ? and parent_id = ?', [menuRoot, parentId]);
      findData = results;
    }
    if(findData.length !== 0) {
      return {code: 400, results: menuType === 1? '菜单名称不能重复': '按钮权限标识不能重复'}
    } 
    const data = await db.query(`INSERT INTO menus (id, menu_type, menu_name, menu_path, menu_root, menu_sort, parent_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)`, [createId(), menuType, menuName, menuPath, menuRoot, menuSort, parentId]);
    return data
  },
  /**
   * @description: 修改
   * @return {*}
   */  
  updateSql: async (params) => {
    let {
      menuName, // 菜单名称
      menuSort, // 排序
      id        // key
    } = params;
    const data = await db.query(
      `update menus set menu_name = ?, menu_sort = ? where id = ?`, [menuName, menuSort, id]);
    return data
  },
  /**
   * @description: 删除
   * @return {*}
   */  
  deleteSQL: async (params) => {
    const {id} = params;
    const data = await db.query(`delete from menus where id = ?`, [id]);
    return data;
  }
}

module.exports = serves;