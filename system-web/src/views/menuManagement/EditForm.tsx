/*
 * @Description: 菜单
 * @Author: huazj
 * @Date: 2023-07-19 23:38:19
 * @LastEditTime: 2024-04-12 21:01:10
 * @LastEditors: huazj
 */
import React, { memo, forwardRef, useEffect, useState } from 'react';
import { Drawer, Form, Button, Input, Radio } from 'antd';

import type { RadioChangeEvent } from 'antd';

import Notification from '@/components/Notification';

import request from '@/request';
import { addMenus, updateMenus } from '@/api/menus';

type props = {
  editVisible:boolean,
  setEditVisible:Function,
  handleSearch:Function,
  parentId:string
}
const EditForm = forwardRef(({editVisible, setEditVisible, handleSearch, parentId}:props, ref) => {

  const [form] = Form.useForm();
  const [isEdit, setIsEdit] = useState(false);

  const [value, setValue] = useState(1);

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
    const params = form.getFieldsValue(true);
    form.validateFields().then(async () => {
      const params = form.getFieldsValue(true);
      params.parentId = parentId;
      console.log(params)
      const api = params.id? updateMenus: addMenus;
      const {code, data} = await request(api, params);
      if(code !== 200) return;
      setNotiMsg({type: 'success', message: '操作成功'});
      onClose();
      handleSearch();
    })
  }

  /**
   * @description: 菜单类型改变
   * @return {*}
   * @param {*} val
   */  
  const handleRadioChange = (e:RadioChangeEvent) => {
    setValue(e.target.value);
  }

  useEffect(() => {
    if(!editVisible) return;
    setTimeout(() => {
      if(form.getFieldValue('id')) setIsEdit(true);
      else setIsEdit(false);
      const menuType = Number(form.getFieldValue('menuType') || 1);
      setValue(menuType);
      form.setFieldValue('menuType', menuType);
    })
  }, [editVisible])

  return(
    <>
      <Drawer
        title={`${isEdit? '修改': '新增'}${value === 1? '菜单': '按钮'}`}
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
            name='menuType'
            label='类型'>
            <Radio.Group disabled={isEdit} onChange={handleRadioChange}>
              <Radio value={1}>菜单</Radio>
              <Radio value={2}>按钮</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name='menuName'
            label={`${value === 1? '菜单': '按钮'}名称`}
            rules={[{ required: true, message: '请输入菜单名称' }]}>
              <Input  placeholder="请输入菜单名称" />
          </Form.Item>
          {
            value === 1?
            <Form.Item
              name='menuPath'
              label='菜单路径'
              rules={[{ required: true, message: '请输入菜单路径' }]}>
                <Input disabled={isEdit} placeholder="请输入菜单路径" />
            </Form.Item>
            :
            <Form.Item
              name='menuRoot'
              label='权限标识'
              rules={[{ required: true, message: '请输入权限标识' }]}>
                <Input disabled={isEdit} placeholder="请输入权限标识" />
            </Form.Item>
          }
          <Form.Item
            name='menuSort'
            label='排序'>
              <Input placeholder="请输入排序" />
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