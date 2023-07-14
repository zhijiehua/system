/*
 * @Description: 弹出框编辑
 * @Author: huazj
 * @Date: 2023-04-10 20:35:37
 * @LastEditTime: 2023-04-16 16:39:42
 * @LastEditors: huazj
 */
import { Modal, Form, Input } from 'antd';
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const EditModel: React.FC = () => {
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const {option1:{isModalOpen, modalData}} = useSelector((state:RootState) => ({
    option1: state.option1
  }))
  const handleOk = () => {
    dispatch({type: 'closeModal', form: {...form.getFieldsValue(), key: modalData.key}});
  };

  const handleCancel = () => {
    dispatch({type: 'closeModal'});
  };
  const [form] = Form.useForm();
  useEffect(() => {
    if(formRef.current) {
      form.setFieldsValue(modalData);
    }
  }, [modalData])

  return (
    <Modal title="查看" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <Form form={form} ref={formRef}>
          <Form.Item label="姓名" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="年龄" name="age">
            <Input />
          </Form.Item>
        </Form>
    </Modal>
  );
};

export default EditModel;