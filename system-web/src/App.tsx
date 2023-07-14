/*
 * @Description: app
 * @Author: huazj
 * @Date: 2023-03-25 22:06:36
 * @LastEditTime: 2023-04-16 09:34:48
 * @LastEditors: huazj
 */
import { useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import routes from './router';
function App() {
  const {login:{token}} = useSelector((state:RootState) => ({
    login: state.login
  }))
  const outlet = useRoutes(routes);
  return (
    <div className="App">
      {outlet}
    </div>
  )
}

export default App
