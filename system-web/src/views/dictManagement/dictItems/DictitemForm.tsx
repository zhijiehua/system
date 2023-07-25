/*
 * @Description: 字典项编辑框
 * @Author: huazj
 * @Date: 2023-07-25 09:16:01
 * @LastEditTime: 2023-07-25 20:57:47
 * @LastEditors: huazj
 */
import React, { memo, forwardRef, useEffect, useState } from 'react';
import { Drawer, Form, Button, Input, Select } from 'antd';

import Notification from '@/components/Notification';

import request from '@/request';
import { addDictItemsApi, updateDictItemsApi } from '@/api/dict';
type props = {
  editVisible:boolean,
  setEditVisible:Function,
  handleSearch:Function
}
const DictitemForm = forwardRef(({editVisible, setEditVisible, handleSearch}:props, ref) => {

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
      const api = params.id? updateDictItemsApi: addDictItemsApi;
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
        title={isEdit? '修改字典项': '新增字典项'}
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
            name='dictParent'
            label='字典编码'
            rules={[{ required: true, message: '请输入字典编码' }]}>
              <Input disabled={true} placeholder="请输入字典编码" />
          </Form.Item>
          <Form.Item
            name='label'
            label='数据标签'
            rules={[{ required: true, message: '请输入数据标签' }]}>
              <Input placeholder="请输入数据标签" />
          </Form.Item>
          <Form.Item
            name='value'
            label='数据键值'
            rules={[{ required: true, message: '请输入数据键值' }]}>
              <Input  placeholder="请输入数据键值" />
          </Form.Item>
          <Form.Item
            name='sort'
            label='排序'>
              <Input type='number' placeholder="请输入数据键值" />
          </Form.Item>
          <Form.Item
            name='dictDesc'
            label='代码描述'>
              <Input placeholder="请输入代码描述" />
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

export default memo(DictitemForm)