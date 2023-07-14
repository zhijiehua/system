/*
 * @Description: 
 * @Author: huazj
 * @Date: 2023-04-08 23:48:09
 * @LastEditTime: 2023-04-10 09:36:49
 * @LastEditors: huazj
 */
import creater from '../creater';
const store:StoreInit = {
  state: {
    token: 'login'
  },
  actions: {
    setToken(newState:{token:string}, action:{type:string, value:string}) {
      return newState.token = action.value;
    }
  },
  asyncActions: {
    asyncAdd1(dispatch:Function) {
      setTimeout(() => {
        dispatch({type: 'setToken', value: 5555})
      }, 1000)
    }
  }
}

export default creater(store);