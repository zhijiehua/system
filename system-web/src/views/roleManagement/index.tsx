/*
 * @Description: 角色管理
 * @Author: huazj
 * @Date: 2023-07-17 21:21:38
 * @LastEditTime: 2023-07-18 00:35:52
 * @LastEditors: huazj
 */
import React, {useEffect, useState} from 'react';

import { Space, Table } from 'antd';

import { tableColumns } from './config';
import { getRolesList } from '@/api/roles';
import request from '@/request';

const getList = async () => {
  const {code, data} = await request(getRolesList, {
    current: 1,
    size: 10
  });
}

const RoleManagement: React.FC =  () => {
  const [tableData, setTableData] = useState([
    {roleName: '13', roleDesc: '12', roleCode: '12', number: 10, id: '1'}
  ]);
  useEffect(() => {
    getList();
  })
  return (
    <div
      className='option1'
      style={{flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column'}}>
      <Table
        size='small'
        columns={tableColumns}
        bordered={true}
        className="scrollTable"
        rowKey={record => record.id}
        pagination={false}
        scroll={{y: 12040}}
        dataSource={tableData} />
    </div>
  )
}

export default RoleManagement;