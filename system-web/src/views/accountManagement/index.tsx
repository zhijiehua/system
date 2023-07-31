/*
 * @Description: 帐号管理
 * @Author: huazj
 * @Date: 2023-07-17 21:21:38
 * @LastEditTime: 2023-07-28 18:05:44
 * @LastEditors: huazj
 */
import { useCallback, useRef, useState, useEffect } from 'react';
import { Button, Col, Form, Input, Row, Table } from 'antd';
import request from '@/request';
import { getUserList, deleAccount, updateUserStatus } from '@/api/account';

import { getTableColumn, DataType } from './config';
import type { FormInstance } from 'antd/es/form/Form';

import Pagination from '@/components/pagination';
import ModalConfirm from '@/components/ModalConfirm';
import Notification from '@/components/Notification';
import EditForm from './EditForm';
import PasswordForm from './PasswordForm';

import './index.scss';

let deleteId:string;
const AccountManagement: React.FC =  () => {

  const [form] = Form.useForm();
  const [pagesInfo, setPagesInfo] = useState<pagesInfo>({
    current: 1,
    size: 10,
    total: 0
  })
  const [passwordInfo, setPasswordInfo] = useState<{visible:boolean, userId:string}>({
    visible: false,
    userId: ''
  });


  /**
   * @description: 表格点击事件
   * @return {*}
   * @param {string} type
   * @param {DataType} data
   */  
  const handleTableBtn = async (type:string, data:DataType) => {
    switch(type) {
      case 'delete':
        deleteId = data.id;
        setModelContent(`确定要删除帐号名称为${data.userName}的帐号吗?`);
        break;
      case 'edit':
        setEditVisible(true);;
        setTimeout(() => {
          editFormRef.current?.setFieldsValue(data);
        })
        break;
      case 'status':
        const preStatus = data.status === 1? 0: 1;
        const {code} = await request(updateUserStatus, {id: data.id, status: preStatus});
        if(code !== 200) return;
        let find = tableData.find(item => item === data);
        if(find) find.status = preStatus;
        setTableData([...tableData]);
        break;
      case 'updatePassword':
        setPasswordInfo({visible: true, userId: data.userId})
        break;
    }
  }
  const [tableData, setTableData] = useState<DataType[]>([]);
  const [modelContent, setModelContent] = useState('');
  const tableColumns = getTableColumn(handleTableBtn);
  const [notiMsg, setNotiMsg] = useState<notiMsgType>({type: '', message: ''});
  /**
   * @description:  查询列表
   * @return {*}
   */  
  const handleSearch = async () => {
    const {code, data:{total, records}} = await request(getUserList, {
      current: pagesInfo.current,
      size: pagesInfo.size,
      ...form.getFieldsValue()
    })
    if(code !== 200) return;
    setPagesInfo({...pagesInfo, total})
    setTableData(records);
  }
  useEffect(() => {
    handleSearch();
  }, [])
  /**
   * @description: 删除
   * @return {*}
   * @param {*} useCallback
   */  
  const deleteFun = useCallback(async (type:string) => {
    if(type === 'sure') {
      const {code} = await request(deleAccount, {id: deleteId});
      if(code !== 200) return;
      handleSearch();
      setNotiMsg({type: 'success', message: '操作成功'});
    }
    setModelContent('');
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
    setEditVisible(true);
    setTimeout(() => {
      editFormRef.current?.resetFields();
    })
  }

  return (
    <div
      className='AccountManagement'>
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
              name='userName'
              label=''>
                <Input placeholder="请输入用户名称搜索" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name='userId'
              label=''>
                <Input placeholder="请输入帐号搜索" />
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
      {/* 编辑框 */}
      <EditForm
        editVisible={editVisible}
        ref={editFormRef}
        setEditVisible={setEditVisible}
        handleSearch={handleSearch}/>
      {/* 修改密码 */}
      <PasswordForm
        passwordInfo={passwordInfo}
        setPasswordInfo={setPasswordInfo}/>
      {/* 确认框 */}
      <ModalConfirm
        content={modelContent}
        handleBtn={deleteFun}/>
      {/* 消息提示框 */}
      <Notification notiMsg={notiMsg}/>
      {/* 字典项 */}
    </div>
  )
}

export default AccountManagement;