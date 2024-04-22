/*
 * @Description: 设置权限
 * @Author: huazj
 * @Date: 2024-04-16 20:56:06
 * @LastEditTime: 2024-04-16 23:11:33
 * @LastEditors: huazj
 */
import { Button, Modal } from 'antd';
import { useState, useEffect } from 'react';
import request from '@/request';
import { getAppList } from '@/api/app';
export default function SetRole() {
  const [open, setOpen] = useState(false);
  const handleOk = () => {

  }
  const handleCancel = () => {
    
  }
  const [apps, setApps] = useState<{appName: string, appIcon: string}[]>([]);

  const getAllApps = async () => {
    const {code, data:{total, records}} = await request(getAppList, {
      current: 1,
      size: 100,
    })
    if(code !== 200) return;
    setApps(records);
  }

  useEffect(() => {
    getAllApps();
  }, [])
  return (
    <Modal
      title="设置权限"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      okButtonProps={{  }}
      cancelButtonProps={{  }}
    >
      {
        apps.map(item => {
          return (
            <h5>{ item.appName }</h5>
          )
        })
      }
    </Modal>
  )
}