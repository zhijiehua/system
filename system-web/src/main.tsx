/*
 * @Description: 
 * @Author: huazj
 * @Date: 2023-03-25 22:06:36
 * @LastEditTime: 2024-01-05 20:47:06
 * @LastEditors: huazj
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import {Provider} from 'react-redux';
import store from './store';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/es/locale/zh_CN';

import App from './App';
import '@/assets/css/index.scss';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <ConfigProvider locale={zh_CN}>
      <Provider store={store}>
        <App></App>
      </Provider>
    </ConfigProvider>
  </BrowserRouter>
)
