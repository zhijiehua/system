/*
 * @Description: Option2
 * @Author: huazj
 * @Date: 2023-03-25 23:09:19
 * @LastEditTime: 2023-04-16 15:46:01
 * @LastEditors: huazj
 */
import React, { useEffect, useState } from 'react';
import CardNum from '@/components/cardNum';
import imgUrl from '@/assets/images/sjzx_icon@3x.png';
import type { ColumnsType } from 'antd/es/table';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu, Table, Space } from 'antd';
import {importTableData} from './config.js';
import EditModel from './EditModel';
interface DataType {
  key: string;
  hphm: string;
  time: string;
  road: string;
  type: string;
}
const data = [
  {
    title: '历史黑名单抓拍数',
    num: 9635,
  },
  {
    title: '历史黑名单抓拍数',
    num: 9635,
  },
  {
    title: '历史黑名单抓拍数',
    num: 9635,
  },
  {
    title: '历史黑名单抓拍数',
    num: 9635,
  },
]
const items: MenuProps['items'] = [
  {
    label: '全部类型',
    key: 'all',
    icon: <MailOutlined />,
  },
  {
    label: '黑名单',
    key: 'black',
    icon: <AppstoreOutlined />,
  },
  {
    label: '白名单',
    key: 'white',
    icon: <AppstoreOutlined />,
  },
  {
    label: '红名单',
    key: 'red',
    icon: <AppstoreOutlined />,
  }
];

/**
 * @description: 获取所属名单值
 * @return {*}
 * @param {string} key
 */
const getVal = (key:string) => {
  const findItem = items.find(item => item?.key === key);
  if(findItem) return (findItem as {label:string}).label;
}
const Option2 = () => {
  const columns: ColumnsType<DataType> = [
    {
      title: '序号',
      dataIndex: 'index',
      width: 80,
      key: 'index',
      fixed: 'left',
      align: 'center',
      render: (text, record, index) => <a>{index + 1}</a>,
    },
    {
      title: '号牌号码',
      dataIndex: 'hphm',
      width: 200,
      key: 'hphm',
      align: 'center',
      render: text => <a>{text}</a>,
    },
    {
      title: '抓拍时间',
      dataIndex: 'time',
      width: 200,
      key: 'time',
      align: 'center',
      render: text => <a>{text}</a>,
    },
    {
      title: '抓拍路口',
      dataIndex: 'road',
      width: 200,
      key: 'road',
      align: 'center',
      render: text => <a>{text}</a>,
    },
    {
      title: '所属名单',
      dataIndex: 'type',
      width: 200,
      key: 'type',
      align: 'center',
      render: text => <a>{getVal(text)}</a>,
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      fixed: 'right',
      width: 200,
      render: (text, record, index) => (
        <Space size="middle">
          <a onClick={() => handleEdit(text, record, index)}>Edit</a>
        </Space>
      ),
    },
  ];
  const [current, setCurrent] = useState('all');
  const [tableData, setTableData] = useState(importTableData);
  /**
   * @description: tab点击
   * @return {*}
   * @param {*} e
   */  
  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalData, setModelData] = useState<DataType|null>(null);
  /**
   * @description: 编辑
   * @return {*}
   * @param {string} text
   * @param {DataType} record
   * @param {number} index
   */  
  const handleEdit = (text:string, record:DataType, index:number) => {
    setIsModalOpen(true);
    setModelData(record);
  }
  /**
   * @description: 关闭弹出框
   * @return {*}
   */  
  const modelMethods = (modalStatus:boolean, form?:DataType|undefined) => {
    setIsModalOpen(modalStatus);
    if(form) {
      const findIndex = tableData.findIndex(item => item.key === form.key);
      const copyData:Array<DataType> = [...tableData];
      copyData[findIndex] = form;
      setTableData(copyData);
    }
  }
  useEffect(() => {
    setTableData(importTableData.filter(item => current === 'all'? item: item.type === current))
    tableData
  }, [current])
  return (
    <div className="home" style={{flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column'}}>
      {/* 数据中心 */}
      <div className='beauti-title'>
        <img src={imgUrl} alt="" />
        <span>数据中心</span>
      </div>
      {/* 数字卡片 */}
      <CardNum numObj={data}></CardNum>
      {/* 切换tab */}
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items} />
      {/* 表格 */}
      <Table
          size='small'
          style={{marginTop: 20}}
          columns={columns}
          bordered={true}
          className="scrollTable"
          pagination={false}
          scroll={{ y: 12040}}
          dataSource={tableData} />
      <EditModel
        items={items}
        isModalOpen={isModalOpen}
        modalData={modalData}
        modelMethods={modelMethods}/>
    </div>
  )
}

export default Option2;