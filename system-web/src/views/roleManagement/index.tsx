/*
 * @Description: 角色管理
 * @Author: huazj
 * @Date: 2023-07-17 21:21:38
 * @LastEditTime: 2023-07-20 21:50:19
 * @LastEditors: huazj
 */
import React, {useEffect, useState, useCallback, useRef} from 'react';
import { Button, Col, Form, Input, Row, Table } from 'antd';

import type { FormInstance } from 'antd/es/form/Form'; 'antd';

import Pagination from '@/components/pagination';
import EditForm from './EditForm';

import { getTableColumn } from './config';
import { getRolesList, deleRoles } from '@/api/roles';
import request from '@/request';

import './index.scss';

const RoleManagement: React.FC =  () => {
  
  const [tableData, setTableData] = useState([]);
  const [form] = Form.useForm();
  const [pagesInfo, setPagesInfo] = useState({
    current: 1,
    size: 10,
    total: 100
  })

  useEffect(() => {
    handleSearch();
  }, [])

  /**
   * @description: 表格点击事件
   * @return {*}
   * @param {string} type
   * @param {object} data
   */  
  const handleTableBtn = (type:string, data:{id:string}) => {
    switch(type) {
      case 'delete':
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

  /**
   * @description: 查询
   * @return {*}
   * @param {any} values
   */  
  const handleSearch = useCallback(async () => {
    const {code, data} = await request(getRolesList, {
      current: pagesInfo.current,
      size: pagesInfo.size,
      ...form.getFieldsValue()
    })
    if(code !== 200) return;
    setTableData(data);
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
  return (
    <div className='roleManagement' style={{display: 'flex', flexDirection: 'column', flex: 1}}>
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
        className='option1'
        style={{flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column'}}>
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
      {/* 编辑框 */}
      <EditForm
        editVisible={editVisible}
        ref={editFormRef}
        setEditVisible={setEditVisible}
        handleSearch={handleSearch}/>
    </div>
  )
}

export default RoleManagement;