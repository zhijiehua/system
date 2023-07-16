/*
 * @Description: 请求封装
 * @Author: huazj
 * @Date: 2023-04-02 16:10:22
 * @LastEditTime: 2023-07-16 15:55:29
 * @LastEditors: huazj
 */
import type {AxiosRequestConfig } from "axios";
import axios from './axios'
import qs from 'qs'
import { changeURLArg } from "@/utils/common";
/**
 * @desc Axios 二次封装
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {String} dataFormat [内容请求类型]
 * **/
type reqFun = (config:AxiosRequestConfig & {dataFormat?: string}, params?:any, page?:{[index:string]: number}|undefined) => Promise<{code: number, data: any}>
const request:reqFun = (config, params = {}, page = {}) => {    // eslint-disable-line no-unused-vars
  return new Promise(async (resolve, reject) => {
    try {
      const {
        url,
        method = 'post',
        dataFormat
      } = config   // eslint-disable-line no-unused-vars

      config.headers = { 'Content-Type': 'application/json' }

      /** 区分 post || get 参数健名 **/
      config[['post', 'put'].includes(method) ? 'data' : 'params'] = params

      /** 表单提交 **/
      if (dataFormat == 'formData') {
        config.headers['Content-Type'] = `multipart/form-data;boundary=${new Date().getTime()}`
        config.data = qs.stringify(params)

        if (method != 'get') config.headers['Content-Type'] = `appLication/x-www-form-urLencoded`
      }

      /** 文件下载 **/
      if (dataFormat == 'download') config.responseType = 'blob'

      /** 文件上传 **/
      if (dataFormat == 'file') {
        const formData = new FormData()
        Object.keys(params).forEach(key => formData.append(key, params[key]))
        config.headers['Content-Type'] = `multipart/form-data;boundary=${new Date().getTime()}`
        config.data = formData
      }

      /** 追加对象字符串 到 URL 中 **/
      if(page) {
        if (Object.keys(page).length > 0) config.url = changeURLArg(url, page)
      }

      let { data } = await axios(config)

      resolve(data)
    } catch (error) {
      reject(error)
    }
  })
}

export const postRequest = (config = {}, params = {}, page = {}) => {
  return request({ ...config, method: 'post' } as AxiosRequestConfig, params = {}, page )
}

export const getRequest = (config = {}, params = {}, page = {}) => {
  return request({ ...config, method: 'get' } as AxiosRequestConfig, params = {}, page)
}

export default request