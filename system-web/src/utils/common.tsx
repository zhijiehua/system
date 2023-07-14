import { type } from "os";
import Cookie from "js-cookie";

/*
 * @Description: 公共方法
 * @Author: huazj
 * @Date: 2023-03-30 22:27:54
 * @LastEditTime: 2023-04-12 15:57:54
 * @LastEditors: huazj
 */

/**
 * @description: 找到树节点路径
 * @return {*}
 */
interface TreeNode {
  key: string,
  label: string,
  children?: Array<TreeNode>
}
interface findTree {
  (arr:Array<TreeNode>, key:string): Array<TreeNode>
}
export const findTree:findTree = (arr:Array<TreeNode>, key:string) => {
  let resultPath:Array<TreeNode> = [];
  let hadFind:boolean = false;
  const find = (obj:TreeNode, key:string) => {
    !hadFind&&resultPath.push(obj);
    if(obj.key === key) {
      hadFind = true;
      return;
    }
    if(obj.children) {
      for(let i = 0; i < obj.children.length; i++) {
        find(obj.children[i], key);
      }
      !hadFind&&resultPath.pop();
    } else {
      !hadFind&&resultPath.pop();
    }
  }
  find({key: '', children: arr, label: ''}, key);
  return resultPath
}


/**
 * @description: 设置cookie
 * @return {*}
 * @param {*} name
 * @param {*} content
 */
export const setCookie = (name:string, content:string):void => {
  if (!name) return;
  if (typeof content !== "string") {
      content = JSON.stringify(content);
  }
  Cookie.set(name, content);
};
/**
 * @description: 获取cookie
 * @return {*}
 * @param {*} name
 */
export const getCookie = (name:string|undefined) => {
  if (!name) return;
  try {
    return JSON.parse(Cookie.get(name) || '');
  } catch (error) {
    return Cookie.get(name);
  }
};

/**
 * @desc URL 尾部 追加 参数
 * **/
export const changeURLArg = (url:string|undefined = '', query:{[index:string]: string}) => {
  let str:string = url.match('[\?]') ? '&' : '';
  const keys:Array<string> = Object.keys(query);
  keys.forEach(key => {
    str += !str ? `?${key}=${query[key as any]}` : `&${key}=${query[key as any]}`
  })
  return url + str
}