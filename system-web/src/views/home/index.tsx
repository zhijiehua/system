/*
 * @Description: 首页
 * @Author: huazj
 * @Date: 2024-04-15 22:50:08
 * @LastEditTime: 2024-04-16 20:25:14
 * @LastEditors: huazj
 */
import './index.scss';

import PageHeader from '@/layout/PageHeader';
import request from '@/request';
import { getAppList } from '@/api/app';
import { useEffect, useState } from 'react';

export default function Home() {

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
    <div className="home pageBox">
      <PageHeader />
      <ul className='appBox'>
        {
          apps.map((item, index) => {
            return (
              <li className='appitem' key={index}>
                <div className='appIcon'>
                  <img src={item.appIcon} alt="" />
                </div>
                <p className='appName'>{ item.appName }</p>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}