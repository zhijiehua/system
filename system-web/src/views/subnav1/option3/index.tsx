/*
 * @Description: Option3
 * @Author: huazj
 * @Date: 2023-03-25 23:09:19
 * @LastEditTime: 2023-04-17 20:54:49
 * @LastEditors: huazj
 */
import {threeRender} from './three';
import './index.scss';
import { useEffect } from 'react';
const Option3 = () => {
  useEffect(() => {
    threeRender();
  })
  return (
    <div className="Option3">
      <div id='box'></div>
    </div>
  )
}

export default Option3;