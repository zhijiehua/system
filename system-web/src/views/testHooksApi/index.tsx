/*
 * @Description: 测试hooks
 * @Author: huazj
 * @Date: 2024-01-05 20:22:49
 * @LastEditTime: 2024-01-06 14:41:44
 * @LastEditors: huazj
 */
import { useSelector, connect } from 'react-redux';
import { useState, useDeferredValue } from 'react';

import FirstChild from './components/FirstChild';
import ThemeContext from './components/ThemeContext';

const TestHooksApi: React.FC = (props) => {
  // const s = useSelector((state) => state);
  const [providerVal, setProviderVal] = useState({test: 111});
  const [inputVal, setInputVal] = useState('');
  const deferredValue = useDeferredValue(inputVal);
  
  return (
    <div className="testHooksApi">
      <button onClick={() => setProviderVal({test: 222})}>哈哈哈</button>
      {/* <ThemeContext.Provider value={providerVal} > */}
        <FirstChild test={deferredValue}/>
        <input type="text" onChange={(e) => setInputVal(e.target.value)}/>
      {/* </ThemeContext.Provider> */}
    </div>
  )
}

export default connect((state) => state)(TestHooksApi);