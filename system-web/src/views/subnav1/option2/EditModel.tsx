/*
 * @Description: 弹出框编辑
 * @Author: huazj
 * @Date: 2023-04-10 20:35:37
 * @LastEditTime: 2023-04-16 15:56:25
 * @LastEditors: huazj
 */
import { Modal, Form, Input, Select } from 'antd';
import React, { useEffect, useRef } from 'react';
import type { MenuProps } from 'antd';
interface DataType {
  key: string;
  hphm: string;
  time: string;
  road: string;
  type: string;
}
interface Props {
  isModalOpen: boolean;
  modalData: DataType | null;
  modelMethods: (modalStatus:boolean, form?: DataType) => void;
  items: MenuProps['items']
};
const { Option } = Select;
const EditModel: React.FC<Props> = ({isModalOpen, modalData, items, modelMethods}) => {
  const formRef = useRef(null);
  const handleOk = () => {
    modelMethods(false, {...form.getFieldsValue(), key: modalData?.key});
  };
  const handleCancel = () => {
    modelMethods(false);
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
          <Form.Item label="号牌号码" name="hphm">
            <Input />
          </Form.Item>
          <Form.Item label="抓拍时间" name="time">
            <Input />
          </Form.Item>
          <Form.Item label="抓拍路口" name="road">
            <Input />
          </Form.Item>
          <Form.Item label="所属名单" name="type">
          <Select placeholder="请选择">
            {(items|| []).map(item => {
              if(item)
                return <Option key={item.key} value={item.key}>{(item as {label: string}).label}</Option>
            })}
          </Select>
          </Form.Item>
        </Form>
    </Modal>
  );
};

export default EditModel;