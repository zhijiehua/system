/*
 * @Description: 消息通知
 * @Author: huazj
 * @Date: 2023-04-11 23:04:37
 * @LastEditTime: 2023-04-12 01:11:16
 * @LastEditors: huazj
 */
import { notification } from 'antd';
import React, { useEffect, memo } from 'react';

const Notification: React.FC<{notiMsg:notiMsgType}> = memo(({notiMsg}) => {
  useEffect(() => {
    if(!notiMsg.type) return
    notification[notiMsg.type]({
      message: '系统通知',
      description: notiMsg.message
    })
  }, [notiMsg])
  return <></>
})

export default Notification;