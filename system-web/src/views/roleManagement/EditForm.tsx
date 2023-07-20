/*
 * @Description: 角色编辑框
 * @Author: huazj
 * @Date: 2023-07-19 23:38:19
 * @LastEditTime: 2023-07-20 16:36:08
 * @LastEditors: huazj
 */
import React, { memo, forwardRef } from 'react';
import { Drawer, Form, Button, Input } from 'antd';
const EditForm = forwardRef(({editVisible, setEditVisible}:{editVisible:boolean, setEditVisible:Function}, ref) => {

  const [form] = Form.useForm();

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
    form.validateFields().then(res => {
      console.log(res);
    })
  }

  return(
    <>
      <Drawer
        title="新增角色"
        placement="right"
        onClose={onClose}
        open={editVisible}>
        <Form
          form={form}
          ref={ref as any}
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
              <Input placeholder="请输入角色编码" />
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
    </>
  )
})

export default memo(EditForm)