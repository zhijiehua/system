/*
 * @Description: 
 * @Author: huazj
 * @Date: 2023-04-11 23:44:52
 * @LastEditTime: 2023-07-27 15:08:16
 * @LastEditors: huazj
 */

type RootState = ReturnType<typeof import("@/store").getState>

type StoreInit = {
  state:{},
  actions: {[key:string]:Function},
  asyncActions: {[key:string]:Function}
}

type apiConfig = {
  method: string,
  url: string,
  dataFormat: string
}

type pagesInfo = {
  current: number,
  size: number,
  total: number
}