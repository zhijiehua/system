/*
 * @Description: 调用用户信息数据库
 * @Author: huazj
 * @Date: 2023-07-17 00:33:58
 * @LastEditTime: 2024-04-15 21:25:29
 * @LastEditors: huazj
 */
const db = require('../../db/mysql');
const {createId, toCamel} = require('../../utils/common');

/**
 * @description: 帐号列表添加角色信息
 * @return {*}
 * @param {*} arr
 */
const setUserRoles = (arr) => {
  const setPromise = (item) => {
    return new Promise(async (resolve, reject) => {
      const {code, results} = await db.query("select r.id, r.role_name from users_roles ur, roles r where ur.role_id = r.id and ur.user_id = ?", [item.userId]);
      if(code === 200) {
        item.rolesList = toCamel(results);
        resolve();
      }
      reject();
    })
  }
  return new Promise((resolve, reject) => {
    const promiseList = [];
    arr.map(item => {
      promiseList.push(setPromise(item));
    })
    Promise.all(promiseList).then(res => {
      resolve(arr);
    }).catch(e => {
      reject(e);
    })
  })
}

const serves = {
  /**
   * @description: 查询
   * @return {*}
   */  
  searchSQL: async ({current, size, userName = '', userId = ''}) => {
    const begin = size * (current - 1);
    const end = begin + size;
    // 获取数量
    let total = await db.query("select count(*) as total from users");
    // 获取列表数据
    let data = await db.query(
      "select last_login, id, user_id, user_name, status, phone, email from users where (user_name = ? or ? = '') and (user_id = ? or ? = '') limit ? , ?",
      [userName, userName, userId, userId, begin, end,]
    );
    if(total.code === 200 && data.code === 200) {
      const list = await setUserRoles(toCamel(data.results));
      return {
        code: 200,
        results: {
          total: total.results[0].total,
          records: list
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
  },
  /**
   * @description: 帐号设置权限
   * @return {*}
   */  
  userSetRolesSQL: async (params) => {
    const {userId, rolesIds = []} = params;
    const deleData = await db.query(`delete from users_roles where user_id = ?`, [userId]);
    if(deleData.code === 200) {
      let str = '', insetAry = [];
      for (let i = 0; i < rolesIds.length; i++) {
        if(i === rolesIds.length - 1) {
          str += '(?, ?)';
        } else {
          str += '(?, ?), ';
        }
        insetAry = insetAry.concat([userId, rolesIds[i]])
      }
      const data = await db.query(`INSERT INTO users_roles (user_id, role_id) VALUES ${str} `, insetAry);
      return data
    } else {
      return deleData;
    }
  }
  
}

module.exports = serves;