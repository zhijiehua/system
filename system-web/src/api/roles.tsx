/*
 * @Description: 角色管理
 * @Author: huazj
 * @Date: 2023-07-17 23:13:15
 * @LastEditTime: 2023-07-20 21:49:14
 * @LastEditors: huazj
 */

// 获取角色列表
export const getRolesList = {
  method: 'post',
  url: 'roles/getList',
}

// 新增角色
export const addRoles = {
  method: 'put',
  url: 'roles/addRoles'
}

// 删除角色
export const deleRoles = {
  method: 'delete',
  url: 'roles/deleRoles'
}