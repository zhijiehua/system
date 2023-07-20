/*
 * @Description: confirm确认框
 * @Author: huazj
 * @Date: 2023-07-20 22:10:43
 * @LastEditTime: 2023-07-20 23:53:46
 * @LastEditors: huazj
 */
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import React, { useState, memo, useEffect } from 'react';
import Notification from '@/components/Notification';
const ModalConfirm: React.FC<{content:string, handleBtn:Function}> = ({content, handleBtn}) => {
  const [modal, contextHolder] = Modal.useModal();
  const [notiMsg, setNotiMsg] = useState<notiMsgType>({type: '', message: ''});
  useEffect(() => {
    confirm();
  }, [content]);
  const confirm = () => {
    if(!content) return
    const data = modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content,
      okText: '确认',
      onCancel: () => {
        setNotiMsg({type: 'info', message: '已取消'});
        handleBtn('cancel');
      },
      onOk: () => {
        handleBtn('sure');
      },
      cancelText: '取消',
    });
  };

  return (
    <>
      {contextHolder}
      <Notification notiMsg={notiMsg}/>
    </>
  );
};

export default memo(ModalConfirm);