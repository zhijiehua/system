/*
 * @Description: 用户管理
 * @Author: huazj
 * @Date: 2023-07-28 16:05:32
 * @LastEditTime: 2023-08-16 15:32:56
 * @LastEditors: huazj
 */

// 获取用户列表
export const getUserList = {
  method: 'post',
  url: 'users/getList',
}

// 添加用户
export const addAccount = {
  method: 'put',
  url: 'users/addUsers'
}

// 修改用户
export const updateAccount = {
  method: 'put',
  url: 'users/updateUsers'
}

// 删除用户
export const deleAccount = {
  method: 'delete',
  url: 'users/deleUsers'
}

// 更新用户信息
export const updateUserStatus = {
  method: 'put',
  url: 'users/updateStatus'
}
 
// 修改密码
export const updatePassword = {
  method: 'put',
  url: 'users/updatePassword'
}

// 分配角色
export const setRolesApi = {
  method: 'put',
  url: 'users/setRoles'
}