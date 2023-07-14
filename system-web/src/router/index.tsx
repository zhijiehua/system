/*
 * @Description: 路由
 * @Author: huazj
 * @Date: 2023-03-26 10:23:21
 * @LastEditTime: 2023-04-11 19:57:28
 * @LastEditors: huazj
 */

import React , { lazy } from 'react';
import {Navigate} from 'react-router-dom';
import PageLayout from '@/layout/index';

import SkeletonPage from '@/views/SkeletonPage';
const Login = lazy(() => import('@/views/login/index'));
const Option1 = lazy(() => import('@/views/subnav1/option1'));
const Option2 = lazy(() => import('@/views/subnav1/option2'));
const Option3 = lazy(() => import('@/views/subnav1/option3'));
const Option4 = lazy(() => import('@/views/subnav2/option4'));
const Option5 = lazy(() => import('@/views/subnav2/option5'));
const Option6 = lazy(() => import('@/views/subnav2/option6'));
const Option7 = lazy(() => import('@/views/subnav3/option7'));
const Option8 = lazy(() => import('@/views/subnav3/option8'));
const Option9 = lazy(() => import('@/views/subnav3/option9'));
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
    element: <Navigate to="/subnav1"></Navigate>
  },
  {
    path: '/login',
    element: <Login></Login>
  },
  {
    path: '/subnav1',
    element: <PageLayout></PageLayout>,
    children: [
      {
        path: '/subnav1/',
        element: <Navigate to="/subnav1/option1"></Navigate>
      },
      {
        path: '/subnav1/option1',
        element: withLoadingComponent(<Option1 />)
      },
      {
        path: '/subnav1/option2',
        element: withLoadingComponent(<Option2 />)
      },
      {
        path: '/subnav1/option3',
        element: withLoadingComponent(<Option3 />)
      }
    ],
  },
  {
    path: '/subnav2',
    element: <PageLayout></PageLayout>,
    children: [
      {
        path: '/subnav2/',
        element: <Navigate to="/subnav2/option4"></Navigate>
      },
      {
        path: '/subnav2/option4',
        element: withLoadingComponent(<Option4 />)
      },
      {
        path: '/subnav2/option5',
        element: withLoadingComponent(<Option5 />)
      },
      {
        path: '/subnav2/option6',
        element: withLoadingComponent(<Option6 />)
      },
    ]
  },
  {
    path: '/subnav3',
    element: <PageLayout></PageLayout>,
    children: [
      {
        path: '/subnav3/',
        element: <Navigate to="/subnav3/option7"></Navigate>
      },
      {
        path: '/subnav3/option7',
        element: withLoadingComponent(<Option7 />)
      },
      {
        path: '/subnav3/option8',
        element: withLoadingComponent(<Option8 />)
      },
      {
        path: '/subnav3/option9',
        element: withLoadingComponent(<Option9 />)
      },
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