/*
 * @Description: 页面标签
 * @Author: huazj
 * @Date: 2023-03-26 23:29:08
 * @LastEditTime: 2023-04-10 19:20:01
 * @LastEditors: huazj
 */


import { Breadcrumb } from 'antd';

interface Props {
  pageSign: Array<string>
};

const PageSign:React.FC<Props> = ({pageSign}:Props) => {
  return (
    <Breadcrumb className='Breadcrumb'>
      {
      pageSign.map(item => {
        return <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
      })
      }
    </Breadcrumb>
  )
}

export default PageSign;