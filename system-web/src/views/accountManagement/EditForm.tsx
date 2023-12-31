/*
 * @Description: 字典编辑框
 * @Author: huazj
 * @Date: 2023-07-19 23:38:19
 * @LastEditTime: 2023-07-29 11:44:32
 * @LastEditors: huazj
 */
import React, { memo, forwardRef, useEffect, useState } from 'react';
import { Drawer, Form, Button, Input, Select } from 'antd';

import Notification from '@/components/Notification';

import request from '@/request';
import { addAccount, updateAccount } from '@/api/account';
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
      const api = params.id? updateAccount: addAccount;
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
        title={isEdit? '修改帐号': '新增帐号'}
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
            name='userId'
            label='帐号'
            rules={[{ required: true, message: '请输入帐号' }]}>
              <Input disabled={isEdit} placeholder="请输入帐号" />
          </Form.Item>
          <Form.Item
            name='userName'
            label='姓名'
            rules={[{ required: true, message: '请输入姓名' }]}>
              <Input  placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item
            name='status'
            label='帐号状态'
            rules={[{ required: true, message: '请选择帐号状态' }]}>
              <Select
                placeholder="请选择字典状态"
                options={distStatusList}
              />
          </Form.Item>
          <Form.Item
            name='phone'
            label='手机号码'>
              <Input placeholder="请输入手机号码" />
          </Form.Item>
          <Form.Item
            name='email'
            label='邮箱'>
              <Input placeholder="请输入邮箱" />
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