/*
 * @Description: 
 * @Author: huazj
 * @Date: 2023-04-06 19:27:23
 * @LastEditTime: 2023-04-10 09:36:07
 * @LastEditors: huazj
 */
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineReducers } from 'redux';

const modulesFiles = import.meta.globEager('./modules/*');
let moduls:{[string:string]:any} = {};
Object.keys(modulesFiles).map(item => {
  const moduleName = item.replace(/(.+)\/(.+)\.ts$/, '$2');
  moduls[moduleName] = modulesFiles[item].default;
})
const rootReducer = combineReducers(moduls)


const middlewares = composeWithDevTools(applyMiddleware(thunk));
const store = createStore(rootReducer, middlewares);

export default store;