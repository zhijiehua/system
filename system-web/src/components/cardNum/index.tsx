/*
 * @Description: 数组卡片
 * @Author: huazj
 * @Date: 2023-04-15 18:19:40
 * @LastEditTime: 2023-04-15 19:12:17
 * @LastEditors: huazj
 */
import React, { memo } from 'react';
import './index.scss';
import imgUrl from '@/assets/images/bmd_icon.png';
const cardNum: React.FC<{numObj:numcardType, props?:undefined|numcardPropsType}> = memo(({numObj, props}) => {
  return (
    <div className='cardNum'>
      {
        numObj.map((item, index) => {
          return (
            <div className='cardNum-item' key={index} style={{marginLeft: index === 0? 0: '20px'}}>
              <div className='cardNum-left'>
                <div className='title'>{item[props?props.title: 'title']}</div>
                <div className='num'>{item[props?props.num: 'num']}</div>
              </div>
              <div className='cardNum-right'>
                <img src={imgUrl} alt="" />
              </div>
            </div>
          )
        })
      }
    </div>
  )
})

export default cardNum;