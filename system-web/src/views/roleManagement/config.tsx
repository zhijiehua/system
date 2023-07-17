/*
 * @Description: 
 * @Author: huazj
 * @Date: 2023-07-17 21:55:22
 * @LastEditTime: 2023-07-17 23:06:41
 * @LastEditors: huazj
 */
import type { ColumnsType } from 'antd/es/table';
interface DataType {
  id: string,
  roleName?: string;
  roleDesc?: string;
  roleCode?: string;
  number?: number;
}
export const tableColumns:ColumnsType<DataType> = [
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
  }
];