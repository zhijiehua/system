/*
 * @Description: 头部
 * @Author: huazj
 * @Date: 2023-03-26 16:54:31
 * @LastEditTime: 2023-04-15 14:58:23
 * @LastEditors: huazj
 */
import { Layout } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
const { Header } = Layout;

const PageHeader: React.FC = () => {
  return (
    <Header className="layoutHeader">
      {/* <div className="logo" /> */}
      <div className='headerLeft'></div>
      <div className='headerRight'>
        管理员
        <CaretDownOutlined  className='icon'/>
      </div>
    </Header>
  )
}

export default PageHeader;