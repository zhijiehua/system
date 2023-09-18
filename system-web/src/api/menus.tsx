/*
 * @Description: 获取菜单列表
 * @Author: huazj
 * @Date: 2023-09-14 15:46:50
 * @LastEditTime: 2023-09-14 21:49:51
 * @LastEditors: huazj
 */

// 获取菜单列表
export const getMenuList = {
  method: 'post',
  url: 'menus/getList',
}

// 新增菜单
export const addMenus = {
  method: 'put',
  url: 'menus/addMenus'
}

// 修改菜单
export const updateMenus = {
  method: 'put',
  url: 'menus/updateMenus'
}

// 删除菜单
export const deleteMenus = {
  method: 'delete',
  url: 'menus/deleteMenus'
}
