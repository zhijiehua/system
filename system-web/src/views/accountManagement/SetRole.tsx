/*
 * @Description: 分配角色
 * @Author: huazj
 * @Date: 2023-08-15 15:40:35
 * @LastEditTime: 2023-08-21 10:27:08
 * @LastEditors: huazj
 */
import { Modal, Transfer } from 'antd';
import {useState, useEffect} from 'react';
import {DataType as roleDataType} from '../roleManagement/config';
import {setRolesApi} from '@/api/account';
import request from '@/request';
type props = {
  roleInfo:{visible:boolean, userId:string, roleList: {id:string, roleName:string}[]},
  setRoleInfo:Function,
  roleList: roleDataType[],
  setNotiMsg:Function,
  handleSearch:Function
}
interface RecordType {
  id: string;
  title: string;
  description: string;
  chosen: boolean;
}
const SetRole: React.FC<props> = ({roleInfo, setRoleInfo, roleList, setNotiMsg, handleSearch}) => {
  /**
   * @description: 字典项确定
   * @return {*}
   */  
  const handleOk = async () => {
    const {code, data} = await request(setRolesApi, {
      userId: roleInfo.userId,
      rolesIds: targetKeys
    })
    if(code !== 200) return
    setRoleInfo({visible:false, userId: '', roleList: []});
    setNotiMsg({type: 'success', message: '操作成功'});
    handleSearch();
  }

  /**
   * @description: 字典项取消
   * @return {*}
   */  
  const handleCancel = () => {
    setRoleInfo({visible:false, userId: '', roleList: []});
  }

  /**
   * @description: 穿梭框选中改变
   * @return {*}
   */  
  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const handleChange = (newTargetKeys: string[]) => {
    setTargetKeys(newTargetKeys);
  };

  useEffect(() => {
    if(roleInfo && roleInfo.roleList) {
      setTargetKeys(roleInfo.roleList.map(item => item.id));
    }
  }, [roleInfo]);

  return (
    <Modal
      title="分配角色"
      className='SetRole'
      width={700}
      open={roleInfo.visible}
      
      onOk={handleOk}
      onCancel={handleCancel}>
      <Transfer
        dataSource={roleList}
        showSearch
        rowKey={record => record.id}
        listStyle={{
          width: 250,
          height: 300,
        }}
        operations={['to right', 'to left']}
        targetKeys={targetKeys}
        onChange={handleChange}
        render={(item) => `${item.roleName}`}
      />
    </Modal>
  )
}

export default SetRole