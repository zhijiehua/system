/*
 * @Description: 
 * @Author: huazj
 * @Date: 2023-03-26 23:41:11
 * @LastEditTime: 2023-05-06 16:54:48
 * @LastEditors: huazj
 */
import React, { useEffect, useState} from 'react';
import { Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

import routerJson from '@/router/routerJson';

import {findTree} from '@/utils/common';

interface Props {
  getLabels: (labels:Array<string>) => void;
};

const PageNavigation: React.FC<Props> = ({getLabels}: Props) => {
  // 设置默认选中
  const {pathname} = useLocation();
  const [openKeys, setopenKeys] = useState<Array<string>>([pathname.split('/')[1]]);
  const [selectKeys, setSelectKeys] = useState<Array<string>>([pathname]);

  useEffect(() => {
    setopenKeys([pathname.split('/')[1]]);
    setSelectKeys([pathname]);
    const nodeRouters = findTree(routerJson as Array<{key:string, label:string}>, pathname);
    const labels = nodeRouters.map(item => item.label);
    getLabels(labels);
  }, [pathname])

  // 点击跳转
  const navigateTo = useNavigate();
  const menuClick = (e: {key: string}) => {
    navigateTo(e.key);
    setSelectKeys([e.key])
  }

  // 手风琴设置
  const handleOpenChange = (e:Array<string>) => {
    setopenKeys([e[e.length - 1] || '']);
  }
  return (
    <Menu
      className='navigation'
      mode="inline"
      selectedKeys={selectKeys}
      openKeys={openKeys}
      onOpenChange={handleOpenChange}
      style={{ height: '100%', borderRight: 0 }}
      items={routerJson}
      onClick={menuClick}
    />
  )
}

export default PageNavigation;