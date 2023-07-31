/*
 * @Description: 修改密码
 * @Author: huazj
 * @Date: 2023-07-28 17:38:22
 * @LastEditTime: 2023-07-29 11:51:52
 * @LastEditors: huazj
 */
import { Drawer, Form, Button, Input } from 'antd';
import { useEffect, useState } from 'react';
import {updatePassword} from '@/api/account';
import request from '@/request';
import Notification from '@/components/Notification';
const PasswordForm: React.FC<{passwordInfo:{visible:boolean, userId:string}, setPasswordInfo:Function}> = ({passwordInfo, setPasswordInfo}) => {

  const [form] = Form.useForm();
  const [notiMsg, setNotiMsg] = useState<notiMsgType>({type: '', message: ''});
  /**
   * @description: 关闭
   * @return {*}
   */  
  const onClose = () => {
    setPasswordInfo({visible: false, userId: ''})
  }
  
  /**
   * @description: 提交
   * @return {*}
   */  
  const handleSubmit = () => {
    form.validateFields().then(async () => {
      const params = form.getFieldsValue(true);
      const {code, data} = await request(updatePassword, params);
      if(code !== 200) return;
      setNotiMsg({type: 'success', message: '操作成功'});
      onClose();
      // handleSearch();
    })
  }
  const validator = () => {
    if(form.getFieldValue('password') === form.getFieldValue('confirmPassword')) {
      return Promise.resolve();
    } else {
      return Promise.reject('两次输入的密码不一致');
    }
  }

  useEffect(() => {
    if(passwordInfo.visible) {
      setTimeout(() => {
        form.resetFields();
        form.setFieldValue('userId', passwordInfo.userId);
      })
    }
  }, [passwordInfo])

  return (
    <>
      <Drawer
        title='修改密码'
        placement="right"
        onClose={onClose}
        open={passwordInfo.visible}>
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18   }}
          name="advanced_search"
          className="ant-advanced-search-form"
        >
          <Form.Item
            name='userId'
            label='帐号'
            rules={[{ required: true, message: '请输入帐号' }]}>
              <Input disabled={true} placeholder="请输入帐号" />
          </Form.Item>
          <Form.Item
            name='password'
            label='新密码'
            rules={[{ required: true, message: '请输入密码' }, {validator}]}>
              <Input  placeholder="请输入密码" />
          </Form.Item>
          <Form.Item
            name='confirmPassword'
            label='确认密码'
            rules={[{ required: true, message: '请输入密码' }, {validator}]}>
              <Input placeholder="请输入密码" />
          </Form.Item>
          <div className='alignCenter'>
            <Button type='primary' htmlType="submit" onClick={handleSubmit}>保 存</Button>
            <Button style={{marginLeft: '10px'}}  onClick={onClose}>取 消</Button>
          </div>
        </Form>
      </Drawer>
      {/* 消息提示框 */}
      <Notification notiMsg={notiMsg}/>
    </>
  )
}

export default PasswordForm