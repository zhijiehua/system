/*
 * @Description: 分配角色
 * @Author: huazj
 * @Date: 2023-08-15 15:40:35
 * @LastEditTime: 2023-08-16 17:35:23
 * @LastEditors: huazj
 */
import { Modal, Transfer } from 'antd';
import {useState, useEffect} from 'react';
import {DataType as roleDataType} from '../roleManagement/config';
import {setRolesApi} from '@/api/account';
import request from '@/request';
type props = {
  roleInfo:{visible:boolean, userId:string},
  setRoleInfo:Function,
  roleList: roleDataType[],
  setNotiMsg:Function
}
interface RecordType {
  id: string;
  title: string;
  description: string;
  chosen: boolean;
}
const SetRole: React.FC<props> = ({roleInfo, setRoleInfo, roleList, setNotiMsg}) => {
  /**
   * @description: 字典项确定
   * @return {*}
   */  
  const handleOk = async () => {
    console.log(targetKeys, roleInfo);
    const {code, data} = await request(setRolesApi, {
      userId: roleInfo.userId,
      rolesIds: targetKeys
    })
    if(code !== 200) return
    setRoleInfo({visible:false, userId: ''});
    setNotiMsg({type: 'success', message: '操作成功'});
  }

  /**
   * @description: 字典项取消
   * @return {*}
   */  
  const handleCancel = () => {
    setRoleInfo({visible:false, userId: ''});
  }

  /**
   * @description: 穿梭框选中改变
   * @return {*}
   */  
  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const handleChange = (newTargetKeys: string[]) => {
    setTargetKeys(newTargetKeys);
  };

  const [mockData, setMockData] = useState<RecordType[]>([]);

  useEffect(() => {
  }, []);

  return (
    <Modal
      title="分配角色"
      className='SetRole'
      width={1000}
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