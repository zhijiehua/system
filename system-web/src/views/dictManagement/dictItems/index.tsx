/*
 * @Description: 字典项
 * @Author: huazj
 * @Date: 2023-07-24 22:17:25
 * @LastEditTime: 2023-07-25 21:09:35
 * @LastEditors: huazj
 */
import { useState, memo, useEffect, useRef } from 'react';
import { Modal, Table, Button } from 'antd';
import type { FormInstance } from 'antd/es/form/Form';

import DictitemForm from './DictitemForm';
import ModalConfirm from '@/components/ModalConfirm';

import {getDictItemTableColumn, dataTypeDictItem} from '../config';
import {getDictItemsListApi, deleDictItemsApi} from '@/api/dict';
import request from '@/request';

type props = {
  isModalOpen:boolean,
  selectDictCode:string,
  setIsModelOpen:Function
}
let deleteId:string;
const DictItems: React.FC<props> =  ({isModalOpen, selectDictCode, setIsModelOpen}) => {

  const [modelContent, setModelContent] = useState('');
  /**
   * @description: 表格操作事件
   * @return {*}
   */  
  const handleTableBtn = (type:string, data:dataTypeDictItem) => {
    if(type === 'edit') {
      setEditVisible(true);
      setTimeout(() => {
        editFormRef.current?.setFieldsValue(data);
        editFormRef.current?.setFieldValue('dictParent', selectDictCode);
      })
    } else {
      deleteId = data.id;
      setModelContent(`确定要删除数据标签为${data.label}的字典项吗?`);
    }
  }

  /**
   * @description: 删除字典项
   * @return {*}
   */
  const deleteFun = async () => {
    const {code} = await request(deleDictItemsApi, {id: deleteId});
    if(code !== 200) return;
    searchList();
  }

  const [tableData, setTableData] = useState<dataTypeDictItem[]>([]);
  const tableColumns = getDictItemTableColumn(handleTableBtn);
  /**
   * @description: 字典项确定
   * @return {*}
   */  
  const handleOk = () => {
    setIsModelOpen(false);
  }

  /**
   * @description: 字典项取消
   * @return {*}
   */  
  const handleCancel = () => {
    setIsModelOpen(false);
  }

  /**
   * @description: 获取字典项列表
   * @return {*}
   */  
  const searchList = async () => {
    const {code, data} = await request(getDictItemsListApi, {parentCode: selectDictCode});
    if(code !== 200) return;
    setTableData(data);
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
      editFormRef.current?.setFieldValue('dictParent', selectDictCode);
    })
  }

  useEffect(() => {
    if(isModalOpen) searchList();
  }, [isModalOpen])

  return (
    <Modal
      title="字典项"
      width={1000}
      open={isModalOpen}
      footer={null}
      onOk={handleOk}
      onCancel={handleCancel}>
      <Button
        type='primary'
        style={{marginBottom: '20px'}}
        onClick={handleAddBtn}
        >新增</Button>
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
      {/* 编辑 */}
      <DictitemForm
        editVisible={editVisible}
        ref={editFormRef}
        setEditVisible={setEditVisible}
        handleSearch={searchList}/>
      {/* 确认框 */}
      <ModalConfirm
        content={modelContent}
        handleBtn={deleteFun}/>
    </Modal>
  )
}


export default memo(DictItems)