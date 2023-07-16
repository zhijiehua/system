/*
 * @Description: 
 * @Author: huazj
 * @Date: 2023-04-02 23:00:07
 * @LastEditTime: 2023-07-16 15:55:40
 * @LastEditors: huazj
 */

export const login:apiConfig = {
  method: 'post',
  url: '/login/token?username=admin&password=Tydic@0769!&code=&grant_type=password&scope=server',
  dataFormat: 'formData'
}

export const test = {
  method: 'post',
  url: 'users/test',
}