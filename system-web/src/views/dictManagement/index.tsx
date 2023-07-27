/*
 * @Description: 字典管理
 * @Author: huazj
 * @Date: 2023-07-17 21:21:38
 * @LastEditTime: 2023-07-27 15:08:56
 * @LastEditors: huazj
 */
import { useCallback, useRef, useState, useEffect } from 'react';

import { Button, Col, Form, Input, Row, Table } from 'antd';
import type { FormInstance } from 'antd/es/form/Form';

import Pagination from '@/components/pagination';
import EditForm from './EditForm';
import ModalConfirm from '@/components/ModalConfirm';
import Notification from '@/components/Notification';
import DictItems from './dictItems/index';

import { getTableColumn, DataType } from './config';
import { getDictList, updateDictStatus, deleteDicts } from '@/api/dict';
import request from '@/request';

import './index.scss';

let deleteId:string;
const DictManagement: React.FC =  () => {

  const [form] = Form.useForm();
  const [tableData, setTableData] = useState<DataType[]>([]);
  const [modelContent, setModelContent] = useState('');
  const [pagesInfo, setPagesInfo] = useState<pagesInfo>({
    current: 1,
    size: 10,
    total: 0
  })
  const [notiMsg, setNotiMsg] = useState<notiMsgType>({type: '', message: ''});

  /**
   * @description: 查询
   * @return {*}
   * @param {any} values
   */  
  const handleSearch = useCallback(async () => {
    const {code, data:{total, records}} = await request(getDictList, {
      current: pagesInfo.current,
      size: pagesInfo.size,
      ...form.getFieldsValue()
    })
    if(code !== 200) return;
    setPagesInfo({...pagesInfo, total})
    setTableData(records);
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
   * @description: 删除
   * @return {*}
   * @param {*} useCallback
   */  
  const deleteFun = useCallback(async (type:string) => {
    if(type === 'sure') {
      const {code} = await request(deleteDicts, {id: deleteId});
      if(code !== 200) return;
      handleSearch();
      setNotiMsg({type: 'success', message: '操作成功'});
    }
    setModelContent('');
  }, [])

  const [isModalOpen, setIsModelOpen] = useState(false);
  const [selectDictCode, setSelectDictCode] = useState('');

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
        setModelContent(`确定要删除角色名称为${data.dictName}的角色吗?`);
        break;
      case 'edit':
        setEditVisible(true);;
        setTimeout(() => {
          editFormRef.current?.setFieldsValue(data);
        })
        break;
      case 'status':
        const preStatus = data.dictStatus === 1? 0: 1;
        const {code} = await request(updateDictStatus, {id: data.id, dictStatus: preStatus});
        if(code !== 200) return;
        let find = tableData.find(item => item === data);
        if(find) find.dictStatus = preStatus;
        setTableData([...tableData]);
        break;
      case 'dictItem':
        setIsModelOpen(true);
        setSelectDictCode(data.dictCode || '');
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
              name='dictName'
              label=''>
                <Input placeholder="请输入字典名称搜索" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name='dictCode'
              label=''>
                <Input placeholder="请输入字典编码搜索" />
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
      {/* 确认框 */}
      <ModalConfirm
        content={modelContent}
        handleBtn={deleteFun}/>
      {/* 消息提示框 */}
      <Notification notiMsg={notiMsg}/>
      {/* 字典项 */}
      <DictItems
        isModalOpen={isModalOpen}
        selectDictCode={selectDictCode}
        setIsModelOpen={setIsModelOpen}/>
    </div>
  )
}

export default DictManagement;