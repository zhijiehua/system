/*
 * @Description: 应用
 * @Author: huazj
 * @Date: 2023-07-19 23:38:19
 * @LastEditTime: 2023-07-27 20:55:44
 * @LastEditors: huazj
 */
import React, { memo, forwardRef, useEffect, useState } from 'react';
import { Drawer, Form, Button, Input, Select } from 'antd';

import Notification from '@/components/Notification';
import UploadImg from '@/components/UploadImg';

import request from '@/request';
import { addApps, updateApps } from '@/api/app';
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
      const api = params.id? updateApps: addApps;
      const {code} = await request(api, params);
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
        title={isEdit? '修改应用': '新增应用'}
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
            name='appCode'
            label='应用编码'
            rules={[{ required: true, message: '请输入应用编码' }]}>
              <Input disabled={isEdit} placeholder="请输入应用编码" />
          </Form.Item>
          <Form.Item
            name='appName'
            label='应用名称'
            rules={[{ required: true, message: '请输入应用名称' }]}>
              <Input  placeholder="请输入字典名称" />
          </Form.Item>
          <Form.Item
            name='appUrl'
            label='URL'
            rules={[{ required: true, message: '请输入URL' }]}>
              <Input  placeholder="请输入URL" />
          </Form.Item>
          <Form.Item
            name='appStatus'
            label='应用状态'
            rules={[{ required: true, message: '请选择应用状态' }]}>
              <Select
                placeholder="请选择字典状态"
                options={distStatusList}
              />
          </Form.Item>
          <Form.Item
            name='appIcon'
            label='应用图标'
            >
              {/* rules={[{ required: true, message: '请上传应用图标' }]} */}
              <UploadImg/>
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