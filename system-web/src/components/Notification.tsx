/*
 * @Description: 消息通知
 * @Author: huazj
 * @Date: 2023-04-11 23:04:37
 * @LastEditTime: 2023-07-20 22:18:35
 * @LastEditors: huazj
 */
import { notification } from 'antd';
import React, { useEffect, memo } from 'react';

const Notification: React.FC<{notiMsg:notiMsgType}> = ({notiMsg}) => {
  useEffect(() => {
    if(!notiMsg.type) return
    notification[notiMsg.type]({
      message: '系统通知',
      description: notiMsg.message
    })
  }, [notiMsg])
  return <></>
}

export default memo(Notification);