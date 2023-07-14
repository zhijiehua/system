/*
 * @Description: 路由内容
 * @Author: huazj
 * @Date: 2023-03-26 23:22:32
 * @LastEditTime: 2023-04-10 19:22:06
 * @LastEditors: huazj
 */
import { Layout } from 'antd';
const { Content } = Layout;
import { Outlet } from 'react-router-dom';

const PageContent: React.FC = () => {
  return (
    <Content
      className="pageContent"
    >
      <Outlet></Outlet>
    </Content>
  )
}

export default PageContent;