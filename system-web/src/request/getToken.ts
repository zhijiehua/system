import { type } from 'os';
/*
 * @Description: 获取token
 * @Author: huazj
 * @Date: 2023-04-02 16:11:17
 * @LastEditTime: 2023-04-02 16:22:45
 * @LastEditors: huazj
 */
import { setCookie } from '@/utils/common'
let token:string|null = null

if (window.location.href.indexOf('token=') > -1) {
    let token:string = window.location.href.split('token=')?.[1]
    if (token.indexOf('&') > -1) token = token.split('&')?.[0]
    const { pathname, origin } = window.location
    setCookie('token', token)
    location.href = origin + pathname
}

export default token