/*
 * @Description: 创建excels表格
 * @Author: huazj
 * @Date: 2024-04-12 23:01:39
 * @LastEditTime: 2024-04-22 16:12:21
 * @LastEditors: huazj
 */
const Excel = require('exceljs');
const daduiList = require('./daduiList');
const colorList = ['00b050', 'ffff00', 'ffc000'];

const {f79646, ffff00, headers} = require('./arrays');

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
  worksheet.columns = headers;

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
  for(let i = 2; i < 26; i++) {
    worksheet.getColumn(i).width = 40;
  }

  // 设置顶部表格背景色
  const header = worksheet.getRow(1);
  
  f79646.map(item => {
    header.getCell(item).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: {argb: 'f79646'}
    }
  })
  ffff00.map(item => {
    header.getCell(item).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: {argb: 'ffff00'}
    }
  })
 
  // 写入文件
  await workbook.xlsx.writeFile('myExcel.xlsx');
}
 
module.exports = createExcel