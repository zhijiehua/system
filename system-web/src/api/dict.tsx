/*
 * @Description: 字典管理
 * @Author: huazj
 * @Date: 2023-07-24 16:31:03
 * @LastEditTime: 2023-07-24 21:44:19
 * @LastEditors: huazj
 */

// 获取字典列表
export const getDictList = {
  method: 'post',
  url: 'dict/getList',
}

// 添加字典
export const addDicts = {
  method: 'put',
  url: 'dict/addDicts'
}

// 修改字典
export const updateDicts = {
  method: 'put',
  url: 'dict/updateDicts'
}

// 修改字典状态
export const updateDictStatus = {
  method: 'put',
  url: 'dict/updateStatus'
}

// 删除字典
export const deleteDicts = {
  method: 'delete',
  url: 'dict/deleDicts'
}