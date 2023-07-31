/*
 * @Description: 应用管理
 * @Author: huazj
 * @Date: 2023-07-27 14:58:50
 * @LastEditTime: 2023-07-28 18:04:48
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
  userId: string;
  userName?: string;
  userRoles?:string,
  status?: number
  phone?:string,
  email?:string
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
      title: '帐号',
      dataIndex: 'userId',
      key: 'name',
      align: 'center',
      render: text => <a>{text}</a>,
    },
    {
      title: '姓名',
      dataIndex: 'userName',
      key: 'name',
      align: 'center',
      render: text => <a>{text}</a>,
    },
    {
      title: '拥有角色',
      dataIndex: 'userRoles',
      key: 'name',
      align: 'center',
      render: text => <a>{text}</a>,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'name',
      align: 'center',
      render: (text, data) => {
        return (
          <Switch
            checked={Boolean(data.status)}
            onChange={() => callback('status', data)} />
        )
      }
    },
    {
      title: '手机号码',
      dataIndex: 'phone',
      key: 'name',
      align: 'center',
      render: text => <a>{text}</a>,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'name',
      align: 'center',
      render: text => <a>{text}</a>,
    },
    {
      title: '最后登陆时间',
      dataIndex: 'lastLogin',
      key: 'name',
      align: 'center',
      render: text => <a>{text}</a>,
    },
    {
      title: '操作',
      key: 'action',
      width: '300px',
      align: 'center',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => callback('edit', record)}>编辑</a>
          <a onClick={() => callback('updatePassword', record)}>修改密码</a>
          <a onClick={() => callback('dictItem', record)}>分配角色</a>
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