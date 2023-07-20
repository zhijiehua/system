/*
 * @Description: 
 * @Author: huazj
 * @Date: 2023-07-17 21:55:22
 * @LastEditTime: 2023-07-20 00:14:31
 * @LastEditors: huazj
 */
import type { ColumnsType } from 'antd/es/table';

import { Space, Button } from 'antd';
interface DataType {
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
      title: '角色编码',
      dataIndex: 'roleCode',
      key: 'name',
      align: 'center',
      render: text => <a>{text}</a>,
    },
    {
      title: '关联帐号数',
      dataIndex: 'number',
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
        </Space>
      ),
    },
  ]; 
  return tableColumn;
}
