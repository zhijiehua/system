/*
 * @Description: 应用管理
 * @Author: huazj
 * @Date: 2023-07-27 14:58:50
 * @LastEditTime: 2023-07-28 13:01:32
 * @LastEditors: huazj
 */
import type { ColumnsType } from 'antd/es/table';

import { Space, Switch } from 'antd';

/**
 * @description: 表数据类型
 * @return {*}
 */
export interface DataType {
  id: string,
  appCode?: string;
  appName?: string;
  appIcon?:string,
  appUrl?:string,
  appStatus?: number
}

/**
 * @description: 获取表格
 * @return {*}
 * @param {Function} callback
 */
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
      title: '应用编码',
      dataIndex: 'appCode',
      key: 'name',
      align: 'center',
      render: text => <a>{text}</a>,
    },
    {
      title: '应用名称',
      dataIndex: 'appName',
      key: 'name',
      align: 'center',
      render: text => <a>{text}</a>,
    },
    {
      title: '应用图标',
      dataIndex: 'appIcon',
      key: 'name',
      align: 'center',
      render: text => (
        <span className='tableImg'><img src={text} alt="" /></span>
      ),
    },
    {
      title: 'URL',
      dataIndex: 'appUrl',
      key: 'name',
      align: 'center',
      render: text => <a>{text}</a>,
    },
    {
      title: '状态',
      dataIndex: 'appStatus',
      key: 'name',
      align: 'center',
      render: (text, data) => {
        return (
          <Switch
            checked={Boolean(data.appStatus)}
            onChange={() => callback('status', data)} />
        )
      }
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => callback('edit', record)}>编辑</a>
          <a onClick={() => callback('dictItem', record)}>关联字典</a>
          <a onClick={() => callback('delete', record)}>删除</a>
        </Space>
      ),
    },
  ]; 
  return tableColumn;
}

/**
 * @description: 字典状态
 * @return {*}
 */
export const distStatusList = [
  {
    label: '启用',
    value: 1
  },
  {
    label: '停用',
    value: 0
  },
]