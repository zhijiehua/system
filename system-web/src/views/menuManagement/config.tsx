/*
 * @Description: 菜单编辑
 * @Author: huazj
 * @Date: 2023-09-13 09:39:33
 * @LastEditTime: 2023-09-14 20:24:37
 * @LastEditors: huazj
 */
import type { ColumnsType } from 'antd/es/table';

import { Space, Button } from 'antd';
export interface DataType {
  id: string,
  menuName?: string;
  menuType?: string;
  menuPath?: string;
  menuRoot?: string;
  menuSort?:string;
  parentId:string;
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
      title: '菜单名称',
      dataIndex: 'menuName',
      key: 'name',
      align: 'center',
      render: text => <a>{text}</a>,
    },
    {
      title: '菜单类型',
      dataIndex: 'menuType',
      key: 'name',
      align: 'center',
      render: text => <a>{text}</a>,
    },
    {
      title: '前端路径',
      dataIndex: 'menuPath',
      key: 'name',
      align: 'center',
      render: text => <a>{text}</a>,
    },
    {
      title: '权限标识',
      dataIndex: 'menuRoot',
      key: 'name',
      align: 'center',
      render: text => <a>{text}</a>,
    },
    {
      title: '排序',
      dataIndex: 'menuSort',
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
          <a onClick={() => callback('add', record)}>添加下级</a>
          <a onClick={() => callback('delete', record)}>删除</a>
        </Space>
      ),
    },
  ]; 
  return tableColumn;
}