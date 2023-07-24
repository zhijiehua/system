/*
 * @Description: 字典管理
 * @Author: huazj
 * @Date: 2023-07-17 21:21:38
 * @LastEditTime: 2023-07-24 10:40:16
 * @LastEditors: huazj
 */
import { useCallback, useRef, useState, useEffect } from 'react';

import { Button, Col, Form, Input, Row, Table } from 'antd';
import type { FormInstance } from 'antd/es/form/Form';

import Pagination from '@/components/pagination';

import { getTableColumn, DataType } from './config';

const DictManagement: React.FC =  () => {

  const [form] = Form.useForm();
  const [tableData, setTableData] = useState<DataType[]>([]);
  const [pagesInfo, setPagesInfo] = useState({
    current: 1,
    size: 10,
    total: 0
  })

  /**
   * @description: 查询
   * @return {*}
   * @param {any} values
   */  
  const handleSearch = useCallback(async () => {
    // const {code, data:{total, records}} = await request(getRolesList, {
    //   current: pagesInfo.current,
    //   size: pagesInfo.size,
    //   ...form.getFieldsValue()
    // })
    // if(code !== 200) return;
    // setPagesInfo({...pagesInfo, total})
    // setTableData(records);
    setTableData([{dictCode: '123', dictName: '测试', dictStatus: '1', dictDesc: '描述', id: ''}]);
  }, [])

  useEffect(() => {
    handleSearch();
  }, [])

  /**
   * @description: 重置
   * @return {*}
   */  
  const handlleReset = () => {
    form.resetFields();
  }

  const editFormRef = useRef<FormInstance>();
  const [editVisible, setEditVisible] = useState(false);
  /**
   * @description: 新增
   * @return {*}
   */  
  const handleAddBtn = () => {
    setEditVisible(true);;
    setTimeout(() => {
      editFormRef.current?.resetFields();
    })
  }

  /**
   * @description: 表格点击事件
   * @return {*}
   * @param {string} type
   * @param {object} data
   */
  const handleTableBtn = async (type:string, data:{id:string, roleName:string}) => {
    switch (type) {
      case 'delete':
        // deleteId = data.id;
        // setModelContent(`确定要删除角色名称为${data.roleName}的角色吗?`);
        break;
      case 'edit':
        setEditVisible(true);;
        setTimeout(() => {
          editFormRef.current?.setFieldsValue(data);
        })
        break;
    }
  }
  const tableColumns = getTableColumn(handleTableBtn);

  return (
    <div
      className='dictManagement'>
      {/* 查询表单 */}
      <Form
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        onFinish={handleSearch}
      >
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item
              name='roleName'
              label=''>
                <Input placeholder="请输入角色名称搜索" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name='roleCode'
              label=''>
                <Input placeholder="请输入角色编码搜索" />
            </Form.Item>
          </Col>
          <Button type='primary' htmlType="submit">查 询</Button>
          <Button style={{marginLeft: '10px'}} onClick={handlleReset}>重 置</Button>
          <Button style={{marginLeft: '10px'}} type='primary' onClick={handleAddBtn}>新 增</Button>
        </Row>
      </Form>
      {/* 表格 */}
      <div
        className='option1'>
        <Table
          size='small'
          columns={tableColumns}
          bordered={true}
          className="scrollTable"
          rowKey={record => record.id}
          pagination={false}
          scroll={{y: 12040}}
          dataSource={tableData} />
      </div>
      {/* 分页 */}
      <Pagination
        pagesInfo={pagesInfo}
        setPagesInfo={setPagesInfo}
        handleSearch={handleSearch}/>
    </div>
  )
}

export default DictManagement;