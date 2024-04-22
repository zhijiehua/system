/*
 * @Description: 登陆
 * @Author: huazj
 * @Date: 2023-04-06 20:22:48
 * @LastEditTime: 2024-03-19 10:44:04
 * @LastEditors: huazj
 */
import { Button, Input } from 'antd';
import { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Notification from '@/components/Notification';

import './style.scss';
import {
  login
} from '@/api/login';
import request from '@/request';
const Login = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const [account, setAccount] = useState<string>('');
  const [password, setpassword] = useState<string>('');

  const [notiMsg, setNotiMsg] = useState<notiMsgType>({type: '', message: ''})

  /**
   * @description: 提交
   * @return {*}
   */  
  const onSubmit = async () => {
    const {code, data} = await request(login, undefined, undefined);
    if(code != 0) return;
  }

  const changeAccount = (e:ChangeEvent<HTMLInputElement>) => {
    setAccount(e.target.value)
  }
  const changePassword = (e:ChangeEvent<HTMLInputElement>) => {
    setpassword(e.target.value)
  }

  return (
    <div className="login">
      <div className='loginForm'>
        <h1 className='weclomText'>您好，欢迎登陆</h1>
        <h3 className='loginText'>Login</h3>
        <div className='formLabel account'>账号</div>
        <Input type="text" onChange={changeAccount}/>
        <div className='formLabel password'>密码</div>
        <Input type="password" onChange={changePassword}/>
        <Button className='loginBtn' onClick={onSubmit}>登陆</Button>
        <Notification notiMsg={notiMsg}/>
      </div>
    </div>
  )
}

export default Login;