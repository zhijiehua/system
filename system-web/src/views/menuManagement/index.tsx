/*
 * @Description: 菜单管理
 * @Author: huazj
 * @Date: 2023-07-17 21:21:38
 * @LastEditTime: 2023-09-14 21:50:08
 * @LastEditors: huazj
 */
import React, {useEffect, useState, useCallback, useRef} from 'react';
import { Button, Col, Form, Input, Row, Table, Select } from 'antd';

import type { FormInstance } from 'antd/es/form/Form';

import EditForm from './EditForm';
import ModalConfirm from '@/components/ModalConfirm';
import Notification from '@/components/Notification';


import { getTableColumn, DataType } from './config';
import {DataType as AppDataType} from '@/views/appManagement/config';
import { getMenuList, deleteMenus } from '@/api/menus';
import { getAppList } from '@/api/app';

import request from '@/request';

import './index.scss';

let currentShowApp:string;
let deleteId:string;

const MenuManagement: React.FC =  () => {

  const [tableData, setTableData] = useState<DataType[]>([]);
  const [form] = Form.useForm();

  const [appList, setAppList] = useState<AppDataType[]>([]);

  const [parentId, setParentId] = useState('');

  const [modelContent, setModelContent] = useState('');

  /**
   * @description: 表格点击事件
   * @return {*}
   * @param {string} type
   * @param {object} data
   */
  const handleTableBtn = async (type:string, data:DataType) => {
    switch (type) {
      case 'delete':
        deleteId = data.id;
        setModelContent(`确定要删除角色名称为${data.menuName}的角色吗?`);
        break;
      case 'edit':
        setEditVisible(true);
        setTimeout(() => {
          editFormRef.current?.setFieldsValue({...data});
        })
        break;
      case 'add':
        setParentId(data.parentId);
        setEditVisible(true);
        setTimeout(() => {
          editFormRef.current?.resetFields();
        })
        break;
    }
  }

  /**
   * @description: 查询
   * @return {*}
   * @param {any} values
   */  
  const handleSearch = useCallback(async () => {
    currentShowApp = form.getFieldValue('parentId');
    const {code, data:{data}} = await request(getMenuList, {
      ...form.getFieldsValue()
    })
    if(code !== 200) return;
    setTableData(data);
  }, [])

  /**
   * @description:  获取可选app列表
   * @return {*}
   */  
  const getAppListFun = async () => {
    const {code, data:{records}} = await request(getAppList, {current: 1, size: 100});
    if(code !== 200) return;
    setAppList(records);
    if(records.length > 0) {
      form.setFieldValue('parentId', records[0].id);
      handleSearch();
    }
  }

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
    setParentId(currentShowApp);
    setEditVisible(true);
    setTimeout(() => {
      editFormRef.current?.resetFields();
    })
  }

  const [notiMsg, setNotiMsg] = useState<notiMsgType>({type: '', message: ''});
  /**
   * @description: 删除
   * @return {*}
   * @param {*} useCallback
   */  
    const deleteFun = useCallback(async (type:string) => {
      if(type === 'sure') {
        const {code} = await request(deleteMenus, {id: deleteId});
        if(code !== 200) return;
        handleSearch();
        setNotiMsg({type: 'success', message: '操作成功'});
      }
      setModelContent('');
    }, [])

  const tableColumns = getTableColumn(handleTableBtn);

  useEffect(() => {
    getAppListFun();
  }, [])

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
          <Col span={6}>
            <Form.Item
              name='parentId'
              label=''>
                <Select
                  placeholder="请选择所属系统"
                  showSearch={true}
                  filterOption={(input, option) => {
                    return (option?.appName || '').includes(input)
                  }}
                  fieldNames={
                    {
                      label: 'appName',
                      value: 'id'
                    }
                  }
                  options={appList}
              />
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
        parentId={parentId}
        setEditVisible={setEditVisible}
        handleSearch={handleSearch}/>
      {/* 确认框 */}
      <ModalConfirm
        content={modelContent}
        handleBtn={deleteFun}/>
      {/* 消息提示框 */}
      <Notification notiMsg={notiMsg}/>
    </div>
  )
}

export default MenuManagement;