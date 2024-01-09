/*
 * @Description: 
 * @Author: huazj
 * @Date: 2024-01-06 10:27:29
 * @LastEditTime: 2024-01-06 14:39:10
 * @LastEditors: huazj
 */
import { useSelector, connect } from 'react-redux';

import SecondChild from './SecondChild';
const FirstChild: React.FC<{test: string}> = (props) => {
  const s = useSelector((state) => state);
  return (
    <div className="firstChild">
      { props.test }
      <SecondChild />
    </div>
  )
}

export default connect((state) => state)(FirstChild);
