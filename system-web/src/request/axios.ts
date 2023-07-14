/*
 * @Description: axios 拦截器
 * @Author: huazj
 * @Date: 2023-04-02 16:13:00
 * @LastEditTime: 2023-04-12 15:33:49
 * @LastEditors: huazj
 */
import getToken from './getToken'
import axios from 'axios'
import { getCookie } from '@/utils/common'
import baseURL from './baseUrl'
import type {
  AxiosInstance,
} from "axios";

// ! 初始化 axios
let service:AxiosInstance = axios.create({
    baseURL: baseURL,
    headers: { 'Content-Type': 'application/json' },
    timeout: 1000 * 10,                                     //请求超时时间
    withCredentials: true
}),
    httpCode:{[index:string]: any} = {
        '0': '未知原因，请联系后台！',
        '400': '400 错误请求',
        '401': '401 未授权，请重新登录',
        '403': '403 拒绝访问 403',
        '404': '404 请求错误,未找到该资源',
        '405': '405 请求方法未允许',
        '408': '408 请求超时',
        '500': '500 服务器端出错',
        '501': '501 网络未实现',
        '502': '502 网络错误',
        '503': '503 服务不可用',
        '504': '504 网络超时',
        '505': '505 http版本不支持该请求'
    };

/**
 * @desc 响应异常 处理
 * */
const errorCallback = (status:string, data:string, message:string = '请求异常！') => {   // eslint-disable-line no-unused-vars
    if (status == '401') {
        location.href = data + location.href;
    }
    alert('error' + message ?? httpCode[status])
}

// 请求拦截器
service.interceptors.request.use(config => {
    config.headers['Authorization'] = getCookie('token') || 'Basic a24bb8cb-0aaf-4ebc-86ea-7729e321eddb';
    config.headers['isToken'] = false;
    return config
}, error => {
    return Promise.reject(error);
})

/**
 * @desc 响应拦截器，统一处理服务器响应和异常
 * */
service.interceptors.response.use(config => {
    let { code, data, message } = config.data
    if (config.status == 200 && !code) code = 200
    code != 200 && errorCallback(code, data, message)
    return { ...config }
}, error => {
    if (error.request) {
        const { status, response } = error.request
        try {
            const { code, data, message, status } = JSON.parse(response)
            errorCallback(code || status, data, message)
        } catch (error) {
            errorCallback(status, '', response)
        }
        return Promise.reject(error.request)
    }
})

export default service
