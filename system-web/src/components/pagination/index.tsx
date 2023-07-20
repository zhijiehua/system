/*
 * @Description: 分页
 * @Author: huazj
 * @Date: 2023-07-19 10:26:37
 * @LastEditTime: 2023-07-19 20:04:52
 * @LastEditors: huazj
 */
import { Pagination } from 'antd';
import React, {memo} from 'react';
interface Props {
  pagesInfo: {
    size:number,
    current:number,
    total:number
  },
  setPagesInfo: Function,
  handleSearch: Function
};
const CommonPagination: React.FC<Props> =  ({pagesInfo, setPagesInfo, handleSearch}) => {
  const onChange = (current:number, size:number) => {
    setPagesInfo({...pagesInfo, ...{current, size}});
    handleSearch();
  }
  return (
    <Pagination
      style={{marginTop: '20px', textAlign: 'center'}}
      showQuickJumper
      current={pagesInfo.current}
      total={pagesInfo.total}
      onChange={onChange} />
  )
}

export default memo(CommonPagination)