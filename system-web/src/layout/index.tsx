/*
 * @Description: Layout
 * @Author: huazj
 * @Date: 2023-03-26 16:33:25
 * @LastEditTime: 2023-04-15 17:38:39
 * @LastEditors: huazj
 */
import { Layout } from 'antd';
import React, { useState} from 'react';

import PageContent from './PageContent';
import PageHeader from './PageHeader';
import PageSign from './PageSign';
import PageNavigation from './PageNavigation';

import './index.scss';

const { Sider } = Layout;
const PageLayout: React.FC = () => {
  const [pageSign, setPageSign] = useState<Array<string>>([]);
  const getLabels = (data: Array<string>) => {
    setPageSign(data.filter(item => item))
  }
  return (
    <Layout className='pageBox'>
      {/* 头部 */}
      <PageHeader></PageHeader>
      {/*  */}
      <Layout>
        <Sider width={244} className="site-layout-background">
          <PageNavigation getLabels={getLabels}></PageNavigation>
        </Sider>
        <Layout className='rightSec'>
          {/* 页面标签 */}
          <PageSign pageSign={pageSign}></PageSign>
          {/* 页面主要内容 */}
          <PageContent />
        </Layout>
      </Layout>
    </Layout>
  );
}

export default PageLayout;