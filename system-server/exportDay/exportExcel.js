/*
 * @Description: 创建excels表格
 * @Author: huazj
 * @Date: 2024-04-12 23:01:39
 * @LastEditTime: 2024-04-22 09:28:11
 * @LastEditors: huazj
 */

const Excel = require('exceljs');
const daduiList = require('./daduiList');
const colorList = ['00b050', 'ffff00', 'ffc000'];

const chulirenshu = require('./sqls/chulirenshu');
const fuheyouxiao = require('./sqls/fuheyouxiao');
const rengongfuhe = require('./sqls/rengongfuhe');
const tuisongshu = require('./sqls/tuisongshu');


const daduiObj = {}
daduiList.map(group => {
  group.map(item => {
    daduiObj[item.glbm] = item;
  })
})

async function createExcel() {
  // 创建一个新的工作簿
  let workbook = new Excel.Workbook();
 
  // 添加一个工作表
  let worksheet = workbook.addWorksheet('My Sheet');
 
  // 添加表头
  worksheet.columns = [
    { header: '序号', key: 'index' },
    { header: '大队', key: 'name' },
  
    { header: '推送总数（华为）', key: 'tszsHw' },
    { header: '审核总数（华为）', key: 'shzsHw' },
    { header: '复核有效总数（华为）', key: 'fhyxzsHw' },
    { header: '有效数占比（华为）', key: 'yxszbHw' },

    { header: '推送总数（博宏）', key: 'tszsBh' },
    { header: '审核总数（博宏）', key: 'shzsBh' },
    { header: '复核有效总数（博宏）', key: 'fhyxzsBh' },
    { header: '有效数占比（博宏）', key: 'yxszbBh' },

    { header: '推送总数（以撒）', key: 'tszsYs' },
    { header: '审核总数（以撒）', key: 'shzsYs' },
    { header: '复核有效总数（以撒）', key: 'fhyxzsYs' },
    { header: '有效数占比（以撒）', key: 'yxszbYs' },

    { header: '推送车牌数（系统统计）', key: 'tscps' },
    { header: '人工复核总数（系统统计）', key: 'rgfhzs' },
    { header: '人工复核有效数（系统统计）', key: 'rgfhyxs' },
    { header: '发送短信数（需要大队上报）', key: 'fsdxs' },
    { header: '当日“转现场”处理人数（系统统计）', key: 'clrs' },
    { header: '转现场开罚单数（需要大队上报）', key: 'kfds' },
    { header: '审核率', key: 'shl' },
    { header: '复核率（人工复核有效数/人工复核总数）', key: 'fhl' },
    { header: '短信转化率', key: 'dxzhl' },
    { header: '现场转化率', key: 'xczhl' },
    { header: '备注', key: 'note' },
  ];

  // 将数据进行排序
  daduiList.map(item => {
    item.sort((a, b) => b.kfds - a.kfds)
  })
 
  // 添加数据行
  let num = 1;
  daduiList.map((group, index) => {
    group.map((item) => { // 数组扁平化之后写入数据
      const row = worksheet.addRow({
        index: num ++, // 序号
        ...item,
        shl: ((item.rgfhzs / item.tscps) * 100).toFixed(2) + '%',
        fhl: ((item.rgfhyxs / item.rgfhzs) * 100).toFixed(2) + '%',
        dxzhl: ((item.fsdxs / item.rgfhyxs) * 100).toFixed(2) + '%',
        xczhl: ((item.clrs / item.fsdxs) * 100).toFixed(2) + '%',
        note: item.note || ''
      });
      row.getCell('name').fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: {argb: colorList[index]}
      }
    })
  })

  // 设置单元格宽度
  for(let i = 2; i < 14; i++) {
    worksheet.getColumn(i).width = 20;
  }

  // 设置顶部表格背景色
  const header = worksheet.getRow(1);
  ['fsdxs', 'kfds'].map(item => {
    header.getCell(item).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: {argb: 'ffff00'}
    }
  })
  ['tszsHw', 'shzsHw', 'fhyxzsHw', 'yxszbHw', 'tszsBh', 'shzsBh', 'fhyxzsBh', 'yxszbBh', 'tszsYs', 'shzsYs', 'fhyxzsYs', 'yxszbYs', 'fhl'].map(item => {
    header.getCell(item).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: {argb: 'f79646'}
    }
  })
 
  // 写入文件
  await workbook.xlsx.writeFile('myExcel.xlsx');
}
 
module.exports = createExcel