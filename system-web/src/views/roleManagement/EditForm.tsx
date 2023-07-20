/*
 * @Description: 角色编辑框
 * @Author: huazj
 * @Date: 2023-07-19 23:38:19
 * @LastEditTime: 2023-07-20 21:45:10
 * @LastEditors: huazj
 */
import React, { memo, forwardRef, useEffect, useState } from 'react';
import { Drawer, Form, Button, Input } from 'antd';

import Notification from '@/components/Notification';

import request from '@/request';
import { addRoles } from '@/api/roles';
import { type } from 'os';

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
      const {code, data} = await request(addRoles, form.getFieldsValue(true));
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
        title={isEdit? '修改角色': '新增角色'}
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
            name='roleName'
            label='角色名称'
            rules={[{ required: true, message: '请输入角色名称' }]}>
              <Input  placeholder="请输入角色名称" />
          </Form.Item>
          <Form.Item
            name='roleCode'
            label='角色编码'
            rules={[{ required: true, message: '请输入角色编码' }]}>
              <Input disabled={isEdit} placeholder="请输入角色编码" />
          </Form.Item>
          <Form.Item
            name='roleDesc'
            label='角色描述'>
              <Input placeholder="请输入角色描述" />
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