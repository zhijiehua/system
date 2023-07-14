/*
 * @Description: 数字卡片
 * @Author: huazj
 * @Date: 2023-04-24 16:24:43
 * @LastEditTime: 2023-04-24 16:38:50
 * @LastEditors: huazj
 */
import './index.scss';
const cardList:Array<{title: string, num:number}> = [
  {
    title: '事故总量',
    num: 10
  },
  {
    title: '事故总量',
    num: 10
  },
  {
    title: '事故总量',
    num: 10
  },
  {
    title: '事故总量',
    num: 10
  },
]
const CardNum = () => {
  return (
    <div className="CardNum">
      {
        cardList.map((item, index) => (
          <div className='cardItem' key={index} style={{marginLeft: index === 0? '0': '10px'}}>
            <div className="title">{item.title}</div>
            <div className="num">{item.num}</div>
          </div>
        ))
      }
    </div>
  )
}

export default CardNum