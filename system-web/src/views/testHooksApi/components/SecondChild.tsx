import { useSelector, connect } from 'react-redux';
import { useContext } from 'react';

import ThemeContext from './ThemeContext';
const SecondChild: React.FC = (props) => {
  const s = useSelector((state) => state);
  const theme = useContext(ThemeContext);
  console.log(theme.test)
  return (
    <div className="secondChild">
      {/* {theme} */}
      儿子的儿子
    </div>
  )
}

export default connect((state) => state)(SecondChild);