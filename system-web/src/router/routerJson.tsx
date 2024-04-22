/*
 * @Description: 
 * @Author: huazj
 * @Date: 2023-03-30 20:22:01
 * @LastEditTime: 2024-04-12 20:42:46
 * @LastEditors: huazj
 */
import React from 'react';
import type { MenuProps } from 'antd';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
const routerJson:MenuProps['items'] = [
  // {
  //   key: 'subnav1',
  //   icon: React.createElement(UserOutlined),
  //   label: 'subnav1',
  //   children: [
  //     {
  //       key: '/subnav1/option1',
  //       label: 'option1'
  //     },
  //     {
  //       key: '/subnav1/option2',
  //       label: 'option2'
  //     },
  //     {
  //       key: '/subnav1/option3',
  //       label: 'option3'
  //     },
  //   ]
  // },
  {
    key: 'system',
    icon: React.createElement(LaptopOutlined),
    label: '系统设置',
    children: [
      {
        key: '/system/menuManagement',
        label: '菜单管理'
      },
      {
        key: '/system/roleManagement',
        label: '角色管理'
      },
      {
        key: '/system/dictManagement',
        label: '字典管理'
      },
      {
        key: '/system/accountManagement',
        label: '帐号管理'
      },
      {
        key: '/system/appManagement',
        label: '应用管理'
      }
    ]
  }
]

export default routerJson;