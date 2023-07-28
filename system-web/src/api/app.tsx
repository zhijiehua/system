/*
 * @Description: 
 * @Author: huazj
 * @Date: 2023-07-27 20:40:43
 * @LastEditTime: 2023-07-27 21:28:50
 * @LastEditors: huazj
 */

// 获取应用列表
export const getAppList = {
  method: 'post',
  url: 'apps/getList',
}

// 添加应用
export const addApps = {
  method: 'put',
  url: 'apps/addApps'
}

// 修改应用
export const updateApps = {
  method: 'put',
  url: 'apps/updateApps'
}

// 修改应用状态
export const updateAppStatus = {
  method: 'put',
  url: 'apps/updateStatus'
}

// 删除应用
export const deleteApps = {
  method: 'delete',
  url: 'apps/deleApps'
}