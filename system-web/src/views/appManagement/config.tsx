/*
 * @Description: 应用管理
 * @Author: huazj
 * @Date: 2023-07-27 14:58:50
 * @LastEditTime: 2023-07-27 15:01:34
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
  dictCode?: string;
  dictName?: string;
  dictStatus?: number;
  dictDesc?: string;
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
      dataIndex: 'dictCode',
      key: 'name',
      align: 'center',
      render: text => <a>{text}</a>,
    },
    {
      title: '应用名称',
      dataIndex: 'dictName',
      key: 'name',
      align: 'center',
      render: text => <a>{text}</a>,
    },
    {
      title: '应用图标',
      dataIndex: 'dictName',
      key: 'name',
      align: 'center',
      render: text => <a>{text}</a>,
    },
    {
      title: 'URL',
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
      render: (text, data) => {
        return (
          <Switch
            checked={Boolean(data.dictStatus)}
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
          <a onClick={() => callback('dictItem', record)}>字典项</a>
          <a onClick={() => callback('delete', record)}>删除</a>
        </Space>
      ),
    },
  ]; 
  return tableColumn;
}
