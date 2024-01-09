/*
 * @Description: 路由
 * @Author: huazj
 * @Date: 2023-03-26 10:23:21
 * @LastEditTime: 2024-01-05 20:29:41
 * @LastEditors: huazj
 */

import React , { lazy } from 'react';
import {Navigate} from 'react-router-dom';
import PageLayout from '@/layout/index';

import SkeletonPage from '@/views/SkeletonPage';
const Login = lazy(() => import('@/views/login/index'));
const MenuManagement = lazy(() => import('@/views/menuManagement'));
const RoleManagement = lazy(() => import('@/views/roleManagement'));
const DictManagement = lazy(() => import('@/views/dictManagement'));
const AccountManagement = lazy(() => import('@/views/accountManagement'));
const AppManagement = lazy(() => import('@/views/appManagement'));
const TestHooksApi = lazy(() => import('@/views/testHooksApi'));
const Page404 = lazy(() => import('@/views/404'))

const withLoadingComponent = (comp:JSX.Element) => (
  <React.Suspense fallback={<div>
    <SkeletonPage></SkeletonPage>
  </div>}>
    {comp}
  </React.Suspense>
)

const routes = [
  {
    path: '/',
    element: <Navigate to="/system"></Navigate>
  },
  {
    path: '/login',
    element: <Login></Login>
  },
  {
    path: '/system',
    element: <PageLayout></PageLayout>,
    children: [
      {
        path: '/system/',
        element: <Navigate to="/system/menuManagement"></Navigate>
      },
      {
        path: '/system/menuManagement',
        element: withLoadingComponent(<MenuManagement />)
      },
      {
        path: '/system/roleManagement',
        element: withLoadingComponent(<RoleManagement />)
      },
      {
        path: '/system/dictManagement',
        element: withLoadingComponent(<DictManagement />)
      },
      {
        path: '/system/accountManagement',
        element: withLoadingComponent(<AccountManagement />)
      },
      {
        path: '/system/appManagement',
        element: withLoadingComponent(<AppManagement />)
      },
      {
        path: '/system/testHooksApi',
        element: withLoadingComponent(<TestHooksApi />)
      }
    ]
  },
  {
    path: '/404',
    element: withLoadingComponent(<Page404 />)
  },
  {
    path: '*',
    element: <Navigate to="/404"></Navigate>
  }
]

export default routes;