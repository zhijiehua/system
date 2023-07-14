/*
 * @Description: Option4
 * @Author: huazj
 * @Date: 2023-03-25 23:09:19
 * @LastEditTime: 2023-04-24 16:28:29
 * @LastEditors: huazj
 */
import './index.scss';
import CardNum from './components/cardNum/index';
const Option4 = () => {
  return (
    <div className="Option4">
      <section className='borderPage'>
        <div className='contentItem'>
          事故车辆分析
          <div className='content'></div>
        </div>
        <div className='contentItem maxBottom'>
          事故人员分析
          <div className='content'></div>
        </div>
      </section>
      <section className='centerPage'>
        <div className='contentItem' style={{height: '120px', paddingTop: 0, flex: '0 1 auto'}}>
          <div className='content'>
            <CardNum></CardNum>
          </div>
        </div>
        <div className='contentItem'>
          事故路段排名
          <div className='content'></div>
        </div>
        <div className='contentItem maxBottom'>
          拥堵路段排名
          <div className='content'></div>
        </div>
      </section>
      <section className='borderPage'>
        <div className='contentItem'>
          交通事故时间态势
          <div className='content'></div>
        </div>
        <div className='contentItem maxBottom'>
          简易事故处置情况
          <div className='content'></div>
        </div>
      </section>
    </div>
  )
}

export default Option4;