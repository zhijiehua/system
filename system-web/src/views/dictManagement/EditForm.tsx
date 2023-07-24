/*
 * @Description: 字典编辑框
 * @Author: huazj
 * @Date: 2023-07-19 23:38:19
 * @LastEditTime: 2023-07-24 18:10:43
 * @LastEditors: huazj
 */
import React, { memo, forwardRef, useEffect, useState } from 'react';
import { Drawer, Form, Button, Input, Select } from 'antd';

import Notification from '@/components/Notification';

import request from '@/request';
import { addDicts, updateDicts } from '@/api/dict';
import {distStatusList} from './config';

type props = {
  editVisible:boolean,
  setEditVisible:Function,
  handleSearch:Function
}
const EditForm = forwardRef(({editVisible, setEditVisible, handleSearch}:props, ref) => {

  const [form] = Form.useForm();
  const [isEdit, setIsEdit] = useState(false);

  const [notiMsg, setNotiMsg] = useState<notiMsgType>({type: '', message: ''});

  /**
   * @description: 关闭
   * @return {*}
   */  
  const onClose = () => {
    setEditVisible(false);
  };

  /**
   * @description: 提交
   * @return {*}
   */  
  const handleSubmit = () => {
    form.validateFields().then(async () => {
      const params = form.getFieldsValue(true);
      const api = params.id? updateDicts: addDicts;
      const {code, data} = await request(api, params);
      if(code !== 200) return;
      setNotiMsg({type: 'success', message: '操作成功'});
      onClose();
      handleSearch();
    })
  }

  useEffect(() => {
    if(!editVisible) return;
    setTimeout(() => {
      if(form.getFieldValue('id')) setIsEdit(true);
      else setIsEdit(false);
    })
  }, [editVisible])

  return(
    <>
      <Drawer
        title={isEdit? '修改字典': '新增字典'}
        placement="right"
        onClose={onClose}
        open={editVisible}>
        <Form
          form={form}
          ref={ref as any}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18   }}
          name="advanced_search"
          className="ant-advanced-search-form"
        >
          <Form.Item
            name='dictCode'
            label='字典编码'
            rules={[{ required: true, message: '请输入字典编码' }]}>
              <Input disabled={isEdit} placeholder="请输入字典编码" />
          </Form.Item>
          <Form.Item
            name='dictName'
            label='字典名称'
            rules={[{ required: true, message: '请输入字典名称' }]}>
              <Input  placeholder="请输入字典名称" />
          </Form.Item>
          <Form.Item
            name='dictStatus'
            label='字典状态'
            rules={[{ required: true, message: '请选择字典状态' }]}>
              {/* <Input  placeholder="请选择字典状态" /> */}
              <Select
                placeholder="请选择字典状态"
                options={distStatusList}
              />
          </Form.Item>
          <Form.Item
            name='dictDesc'
            label='字典描述'>
              <Input placeholder="请输入字典描述" />
          </Form.Item>
          <div className='alignCenter'>
            <Button type='primary' htmlType="submit" onClick={handleSubmit}>保 存</Button>
            <Button style={{marginLeft: '10px'}}  onClick={onClose}>取 消</Button>
          </div>
        </Form>
      </Drawer>
      <Notification notiMsg={notiMsg}/>
    </>
  )
})

export default memo(EditForm)