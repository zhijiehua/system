/*
 * @Description: 应用管理
 * @Author: huazj
 * @Date: 2023-07-17 21:21:38
 * @LastEditTime: 2023-07-27 15:08:35
 * @LastEditors: huazj
 */
import { useCallback, useRef, useState, useEffect } from 'react';
import { Button, Col, Form, Input, Row, Table } from 'antd';

import { getTableColumn, DataType } from './config';

import Pagination from '@/components/pagination';

const AppManagement: React.FC =  () => {

  const [form] = Form.useForm();
  const [pagesInfo, setPagesInfo] = useState<pagesInfo>({
    current: 1,
    size: 10,
    total: 0
  })
  /**
   * @description:  查询列表
   * @return {*}
   */  
  const handleSearch = () => {

  }
  /**
   * @description: 重置
   * @return {*}
   */  
  const handlleReset = () => {

  }
  /**
   * @description: 新增
   * @return {*}
   */  
  const handleAddBtn = () => {

  }

  const handleTableBtn = () => {

  }
  const [tableData, setTableData] = useState<DataType[]>([]);
  const tableColumns = getTableColumn(handleTableBtn);

  return (
    <div
      className='appManagement'>
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
              name='dictName'
              label=''>
                <Input placeholder="请输入应用名称搜索" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name='dictCode'
              label=''>
                <Input placeholder="请输入应用编码搜索" />
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
      {/* 分页 */}
      <Pagination
        pagesInfo={pagesInfo}
        setPagesInfo={setPagesInfo}
        handleSearch={handleSearch}/>
    </div>
  )
}

export default AppManagement;