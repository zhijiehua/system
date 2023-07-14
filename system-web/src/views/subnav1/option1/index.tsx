/*
 * @Description: Option1
 * @Author: huazj
 * @Date: 2023-03-25 23:09:19
 * @LastEditTime: 2023-04-16 08:48:25
 * @LastEditors: huazj
 */
import SearchForm from './SearchForm';
import BasicTable from './BasicTable';
import EditModel from './EditModel';
import { useSelector } from 'react-redux';
const Option1: React.FC = () => {
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
