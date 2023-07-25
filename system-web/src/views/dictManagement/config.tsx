/*
 * @Description: 
 * @Author: huazj
 * @Date: 2023-07-17 21:55:22
 * @LastEditTime: 2023-07-25 09:03:15
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
      render: (text, data) => {
        return (
          <Switch
            checked={Boolean(data.dictStatus)}
            onChange={() => callback('status', data)} />
        )
      }
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

export interface dataTypeDictItem{
  id:string,
  label:string,
  value:string,
  sort:number
}
export const getDictItemTableColumn = (callback:Function) => {
  const tableColumn:ColumnsType<dataTypeDictItem> = [
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
      title: '数据标签',
      dataIndex: 'label',
      key: 'name',
      align: 'center',
      render: text => <a>{text}</a>,
    },
    {
      title: '数据键值',
      dataIndex: 'value',
      key: 'name',
      align: 'center',
      render: text => <a>{text}</a>,
    },
    {
      title: '排序',
      dataIndex: 'sort',
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
    }
  ];
  return tableColumn
}