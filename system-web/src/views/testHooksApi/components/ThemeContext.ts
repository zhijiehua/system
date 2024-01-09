/*
 * @Description: 
 * @Author: huazj
 * @Date: 2024-01-06 10:34:47
 * @LastEditTime: 2024-01-06 12:38:39
 * @LastEditors: huazj
 */
import { createContext } from 'react';

interface IAnyObj {
  [index: string]: unknown
}

const ThemeContext = createContext({test: 111} as IAnyObj);

export default ThemeContext