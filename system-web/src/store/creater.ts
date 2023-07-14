/*
 * @Description: 生成模块
 * @Author: huazj
 * @Date: 2023-04-10 08:04:23
 * @LastEditTime: 2023-04-10 16:29:35
 * @LastEditors: huazj
 */
export default (store:StoreInit) => {
  let actionsNames:{[key:string]:string} = {};
  Object.keys(store.actions).map(key => {
    actionsNames[key] = key;
  })
  const { actions } = store;

  const creater = (state = {...store.state}, action:{type: string,payload: string}) => {
    const nameList:Array<string> = Object.keys(actionsNames);
    const newState = JSON.parse(JSON.stringify(state));
    for(let i = 0; i < nameList.length; i++) {
      if(action.type === nameList[i]) {
        actions[nameList[i]](newState, action);
        break;
      }
    }
    return newState
  }
  return creater;
}