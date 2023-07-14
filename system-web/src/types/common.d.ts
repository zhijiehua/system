/*
 * @Description: 
 * @Author: huazj
 * @Date: 2023-04-08 20:32:08
 * @LastEditTime: 2023-04-16 13:34:49
 * @LastEditors: huazj
 */

// 消息提示类型
type NotificationType = 'success' | 'info' | 'warning' | 'error' | ''
// 消息提示
type notiMsgType = {
  type: 'success' | 'info' | 'warning' | 'error' | '',
  message: string
}

// 数字卡片
type numcardType = Array<{[index:string]: string | number}>

type numcardPropsType = {title: string, num: string};
