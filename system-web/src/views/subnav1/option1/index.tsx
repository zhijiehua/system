/*
 * @Description: Option1
 * @Author: huazj
 * @Date: 2023-03-25 23:09:19
 * @LastEditTime: 2023-07-16 16:04:52
 * @LastEditors: huazj
 */
import SearchForm from './SearchForm';
import BasicTable from './BasicTable';
import EditModel from './EditModel';
import { useSelector } from 'react-redux';
import { test } from '@/api/login';
import request from '@/request';
import { useEffect } from 'react';

const getData = async () => {
  const {code, data} = await request(test, {
    userName: '系统管理员',
    passWord: 'admin@123',
    accountId: 'admin'
  });
}


const Option1: React.FC =  () => {
  useEffect(() => {
    getData();
  })
  return (
    <div
      className='option1'
      style={{flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column'}}>
      {/* 搜索框 */}
      {/* {isModalOpen ? 'hahah': ''} */}
      <EditModel />
      <SearchForm />
      {/* 表格 */}
      <BasicTable />
    </div>
  )
}

export default Option1;
