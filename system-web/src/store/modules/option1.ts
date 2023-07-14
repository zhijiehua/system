/*
 * @Description: 
 * @Author: huazj
 * @Date: 2023-04-10 08:36:31
 * @LastEditTime: 2023-04-16 16:51:05
 * @LastEditors: huazj
 */
import creater from '../creater';
type stateType = {
  isModalOpen:boolean,
  modalData:object,
  editForm:object|undefined
}
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}
const store:StoreInit = {
  state: {
    isModalOpen: false,
    modalData: null,
    editForm: null
  },
  actions: {
    openModal(newState:stateType, action:{type:string, modalData: object}) {
      return Object.assign(
        newState,
        {
          isModalOpen: true,
          modalData: action.modalData,
        }
      )
    },
    closeModal(newState:stateType, action:{type:string, form:DataType}) {
      return Object.assign(
        newState,
        {
          isModalOpen: false,
          modalData: null,
          editForm: action.form
        }
      )
    }
  },
  asyncActions: {
    asyncAdd1(dispatch:Function) {
      setTimeout(() => {
        dispatch({type: 'setToken1', value: 5555})
      }, 1000)
    }
  }
}
export default creater(store);