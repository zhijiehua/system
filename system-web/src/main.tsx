/*
 * @Description: 
 * @Author: huazj
 * @Date: 2023-03-25 22:06:36
 * @LastEditTime: 2023-04-17 20:54:28
 * @LastEditors: huazj
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import {Provider} from 'react-redux';
import store from './store';

import App from './App';
import '@/assets/css/index.scss';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
      <Provider store={store}>
        <App></App>
      </Provider>
    </BrowserRouter>
  // <React.StrictMode>
  // </React.StrictMode>,
)
