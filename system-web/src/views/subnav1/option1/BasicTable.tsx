/*
 * @Description: 
 * @Author: huazj
 * @Date: 2023-04-09 20:37:45
 * @LastEditTime: 2023-06-02 10:03:59
 * @LastEditors: huazj
 */
import { Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}
const BasicTable: React.FC = () => {
  const {option1:{editForm}} = useSelector((state:RootState) => ({
    option1: state.option1
  }))
  const columns: ColumnsType<DataType> = [
    {
      title: '序号',
      dataIndex: 'name',
      width: 80,
      key: 'name',
      fixed: 'left',
      align: 'center',
      render: (text, record, index) => <a>{index + 1}</a>,
    },
    {
      title: '设备名称',
      dataIndex: 'name',
      width: 200,
      key: 'name',
      fixed: 'left',
      align: 'center',
      render: text => <a>{text}</a>,
    },
    {
      title: '设备类型',
      width: 200,
      align: 'center',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '设备型号',
      width: 200,
      align: 'center',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '设备唯一标识码',
      width: 200,
      align: 'center',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '设备品牌',
      width: 200,
      align: 'center',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '设备单价',
      width: 200,
      align: 'center',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '设备唯一标识码',
      width: 200,
      align: 'center',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '库存状态',
      width: 200,
      align: 'center',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '停用审核状态',
      width: 200,
      align: 'center',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '报废审核状态',
      width: 200,
      align: 'center',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '所在仓库',
      width: 200,
      align: 'center',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      fixed: 'right',
      width: 200,
      render: (text, record, index) => (
        <Space size="middle">
          <a onClick={() => handleDelete(text, record, index)}>Delete</a>
          <a onClick={() => handleEdit(text, record, index)}>Edit</a>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    if(!editForm) return;
    const findIndex = tableData.findIndex(item => item.key === editForm.key);
    if(findIndex !== -1) {
      const copyData = [...tableData];
      copyData[findIndex] = editForm;
      setTableData(copyData);
    }
  }, [editForm])
  const data: DataType[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      key: '4',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      key: '5',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      key: '6',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      key: '7',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      key: '8',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      key: '9',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      key: '10',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      key: '11',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      key: '12',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState(data);
  /**
   * @description: 删除
   * @return {*}
   * @param {object} text
   * @param {object} data
   * @param {number} index
   */  
  const handleDelete = (text:object, data:object, index:number) => {
    tableData.splice(index, 1);
    setTableData([...tableData])
  }
  /**
   * @description: 编辑
   * @return {*}
   * @param {object} text
   * @param {object} data
   * @param {number} index
   */  
  const handleEdit = (text:object, data:object, index:number) => {
    dispatch({type: 'openModal', modalData: data});
  }
  return <Table
          size='small'
          columns={columns}
          bordered={true}
          className="scrollTable"
          pagination={false}
          scroll={{x: 1300, y: 12040}}
          dataSource={tableData} />;

}


export default BasicTable;