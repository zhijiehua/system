/*
 * @Description: 菜单管理
 * @Author: huazj
 * @Date: 2023-07-17 21:21:38
 * @LastEditTime: 2023-09-13 11:38:21
 * @LastEditors: huazj
 */
import React, {useEffect, useState, useCallback, useRef} from 'react';
import { Button, Col, Form, Input, Row, Table } from 'antd';

import type { FormInstance } from 'antd/es/form/Form';

import EditForm from './EditForm';

import { getTableColumn, DataType } from './config';

import './index.scss';

const MenuManagement: React.FC =  () => {

  const [tableData, setTableData] = useState<DataType[]>([]);
  const [form] = Form.useForm();

  /**
   * @description: 表格点击事件
   * @return {*}
   * @param {string} type
   * @param {object} data
   */
  const handleTableBtn = async (type:string, data:DataType) => {
    switch (type) {
      case 'delete':
        // deleteId = data.id;
        // setModelContent(`确定要删除角色名称为${data.roleName}的角色吗?`);
        break;
      case 'edit':
        setEditVisible(true);;
        // setTimeout(() => {
        //   editFormRef.current?.setFieldsValue(data);
        // })
        break;
      case 'add':
        setEditVisible(true);;
        // setTimeout(() => {
        //   editFormRef.current?.setFieldsValue(data);
        // })
        break;
    }
  }

  /**
   * @description: 查询
   * @return {*}
   * @param {any} values
   */  
  const handleSearch = useCallback(async () => {
    // const {code, data:{total, records}} = await request(getRolesList, {
    //   ...form.getFieldsValue()
    // })
    // if(code !== 200) return;
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
      editFormRef.current?.setFieldValue('menuType', 1);
    })
  }

  const tableColumns = getTableColumn(handleTableBtn);

  return (
    <div className='menuManagement'>
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
              name='menuName'
              label=''>
                <Input placeholder="请输入菜单名称搜索" />
            </Form.Item>
          </Col>
          <Button type='primary' htmlType="submit">查 询</Button>
          <Button style={{marginLeft: '10px'}} onClick={handlleReset}>重 置</Button>
          <Button style={{marginLeft: '10px'}} type='primary' onClick={handleAddBtn}>新 增</Button>
        </Row>
      </Form>
      {/* 表格 */}
      <Table
        size='small'
        columns={tableColumns}
        bordered={true}
        className="scrollTable"
        rowKey={record => record.id}
        pagination={false}
        scroll={{y: 12040}}
        dataSource={tableData} />
      {/* 编辑框 */}
      <EditForm
        editVisible={editVisible}
        ref={editFormRef}
        setEditVisible={setEditVisible}
        handleSearch={handleSearch}/>
    </div>
  )
}

export default MenuManagement;