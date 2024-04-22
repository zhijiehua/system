/*
 * @Description: 角色编辑
 * @Author: huazj
 * @Date: 2023-07-17 21:55:22
 * @LastEditTime: 2024-04-14 20:53:41
 * @LastEditors: huazj
 */
import type { ColumnsType } from 'antd/es/table';

import { Space, Button } from 'antd';
export interface DataType {
  id: string,
  roleName?: string;
  roleDesc?: string;
  roleCode?: string;
  number?: number;
}
export const getTableColumn = (callback:Function) => {
  const tableColumn:ColumnsType<DataType> = [
    {
      title: '序号',
      dataIndex: 'index',
      width: 80,
      key: 'name',
      align: 'center',
      render: (text, record, index) => {
        return (<a>{index + 1}</a>)
      }
    },
    {
      title: '角色编码',
      dataIndex: 'roleCode',
      key: 'name',
      align: 'center',
      render: text => <a>{text}</a>,
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'name',
      align: 'center',
      render: text => <a>{text}</a>,
    },
    {
      title: '角色描述',
      dataIndex: 'roleDesc',
      key: 'name',
      align: 'center',
      render: text => <a>{text}</a>,
    },
    {
      title: '关联帐号数',
      dataIndex: 'num',
      key: 'name',
      align: 'center',
      render: text => <a>{text}</a>,
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => callback('edit', record)}>编辑</a>
          <a onClick={() => callback('delete', record)}>删除</a>
          <a onClick={() => callback('delete', record)}>设置权限</a>
        </Space>
      ),
    },
  ]; 
  return tableColumn;
}
