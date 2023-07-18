/*
 * @Description: 角色管理
 * @Author: huazj
 * @Date: 2023-07-17 21:21:38
 * @LastEditTime: 2023-07-18 22:56:14
 * @LastEditors: huazj
 */
import React, {useEffect, useState} from 'react';

import { Button, Col, Form, Input, Row, Select, Table, Pagination } from 'antd';

import { tableColumns } from './config';
import { getRolesList } from '@/api/roles';
import request from '@/request';

const RoleManagement: React.FC =  () => {
  const [tableData, setTableData] = useState([
    {roleName: '13', roleDesc: '12', roleCode: '12', number: 10, id: '1'}
  ]);
  
  const [form] = Form.useForm();
  const [pagesInfo, setPagesInfo] = useState({
    current: 1,
    size: 10,
    total: 100
  })
  /**
   * @description: 查询
   * @return {*}
   * @param {any} values
   */  
  const onFinish = async () => {
    const {code, data} = await request(getRolesList, {
      current: pagesInfo.current,
      size: pagesInfo.size,
      ...form.getFieldsValue()
    });
  };

  /**
   * @description: 分页信息改变
   * @return {*}
   */  
  const onChange = (current:number, size:number) => {
    setPagesInfo({...pagesInfo, ...{current, size}});
    onFinish();
  }
  /**
   * @description: 重置
   * @return {*}
   */  
  const handlleReset = () => {
    form.resetFields();
  }

  /**
   * @description: 新增
   * @return {*}
   */  
  const handleAddBtn = () => {
    setPagesInfo({...pagesInfo, current: 1})
    console.log(pagesInfo)
  }

  useEffect(() => {
    onFinish();
  }, [])
  return (
    <div className='roleManagement' style={{display: 'flex', flexDirection: 'column', flex: 1}}>
      {/* 查询表单 */}
      <Form
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        onFinish={onFinish}
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
        style={{marginTop: '20px', textAlign: 'center'}}
        showQuickJumper
        current={pagesInfo.current}
        total={pagesInfo.total}
        onChange={onChange} />
    </div>
  )
}

export default RoleManagement;