/*
 * @Description: 菜单管理
 * @Author: huazj
 * @Date: 2023-09-14 15:26:34
 * @LastEditTime: 2024-04-12 20:59:09
 * @LastEditors: huazj
 */
const db = require('../../db/mysql');
const {createId, toCamel} = require('../../utils/common');

const serves = {
  /**
   * @description: 查询
   * @return {*}
   */  
  searchSQL: async ({menuName = '', parentId = ''}) => {
    return new Promise(async (resolve, reject) => {
      const returnData = {
        children: []
      }
      const cacheObj = {};
      const promiseList = [];
      const resolveFun = () => {
        Promise.all(promiseList).then(res => {
          if(res.find(item => typeof item === 'object')) {
            resolve({
              code: 400,
              results: 'SQL异常'
            })
          } else {
            resolve({
              code: 200,
              results: returnData.children
            })
          }
        })
      }
      const getChildList = async (parent, menuName, parentId) => {
        const createPromise = new Promise(async (resolve, reject) => {
          let data = await db.query(
            "select * from menus where (menu_name = ? or ? = '') and parent_id = ?",
            [menuName, menuName, parentId]
          );
          if(data.code === 200) {
            parent.children = toCamel(data.results);
            if(parent.children.length === 0) {
              parent.children = null;
              resolveFun();
            }
            parent.children?.map((item, index) => {
              if(item.menuType === '1') {
                cacheObj[item.id] = item;
                getChildList(item, menuName, item.id);
              }
            })
            resolve();
          }
          else reject({code: 400, results: data});
        })
        promiseList.push(createPromise);
      }
      getChildList(returnData, menuName, parentId);
    })
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
      return {code: 400, results: menuType === 1? '菜单路径不能重复': '按钮权限标识不能重复'}
    }
    const data = await db.query(`INSERT INTO menus (id, menu_type, menu_name, menu_path, menu_root, menu_sort, parent_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)`, [createId(), menuType, menuName, menuPath, menuRoot, menuSort, parentId]);
    console.log(data)
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
    const {code, results} = await db.query('select * from menus where parent_id = ?', [id]);
    console.log(code, results)
    if(code === 200 && results.length) {
      return {
        code: 400,
        results: '该菜单下还有子级'
      }
    }
    const data = await db.query(`delete from menus where id = ?`, [id]);
    return data;
  }
}

module.exports = serves;