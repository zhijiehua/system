import React from 'react';
import type { MenuProps } from 'antd';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
const routerJson:MenuProps['items'] = [
  {
    key: 'subnav1',
    icon: React.createElement(UserOutlined),
    label: 'subnav1',
    children: [
      {
        key: '/subnav1/option1',
        label: 'option1'
      },
      {
        key: '/subnav1/option2',
        label: 'option2'
      },
      {
        key: '/subnav1/option3',
        label: 'option3'
      },
    ]
  },
  {
    key: 'subnav2',
    icon: React.createElement(LaptopOutlined),
    label: 'subnav2',
    children: [
      {
        key: '/subnav2/option4',
        label: 'option4'
      },
      {
        key: '/subnav2/option5',
        label: 'option5'
      },
      {
        key: '/subnav2/option6',
        label: 'option6'
      },
    ]
  },
  {
    key: 'subnav3',
    icon: React.createElement(NotificationOutlined),
    label: 'subnav3',
    children: [
      {
        key: '/subnav3/option7',
        label: 'option7'
      },
      {
        key: '/subnav3/option8',
        label: 'option8'
      },
      {
        key: '/subnav3/option9',
        label: 'option9'
      },
    ]
  },
]

export default routerJson;