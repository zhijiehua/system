/*
 * @Description: 
 * @Author: huazj
 * @Date: 2023-07-17 21:55:22
 * @LastEditTime: 2023-07-24 10:39:59
 * @LastEditors: huazj
 */
import type { ColumnsType } from 'antd/es/table';

import { Space, Button } from 'antd';

export interface DataType {
  id: string,
  dictCode?: string;
  dictName?: string;
  dictStatus?: string;
  dictDesc?: string;
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
      title: '字典编码',
      dataIndex: 'dictCode',
      key: 'name',
      align: 'center',
      render: text => <a>{text}</a>,
    },
    {
      title: '字典名称',
      dataIndex: 'dictName',
      key: 'name',
      align: 'center',
      render: text => <a>{text}</a>,
    },
    {
      title: '状态',
      dataIndex: 'dictStatus',
      key: 'name',
      align: 'center',
      render: text => <a>{text}</a>,
    },
    {
      title: '字典描述',
      dataIndex: 'dictDesc',
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
          <a onClick={() => callback('dictItem', record)}>字典项</a>
          <a onClick={() => callback('delete', record)}>删除</a>
        </Space>
      ),
    },
  ]; 
  return tableColumn;
}
