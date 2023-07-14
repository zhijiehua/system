/*
 * @Description: 
 * @Author: huazj
 * @Date: 2023-07-05 11:43:27
 * @LastEditTime: 2023-07-05 15:10:34
 * @LastEditors: huazj
 */
const mysql = require('mysql');
const {database} = require('../config/default');

const pool = mysql.createPool({
  host: database.HOST,
  user: database.USER,
  password: database.PASSWORD,
  database: database.DATABASE
})

const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if(err) {
        reject(err);
        resolve({
          code: 500
        })
      } else {
        connection.query(sql, values, (err, results) => {
          if(err) {
            reject(err);
            resolve({
              code: 400
            })
          } else {
            resolve({
              code: 200,
              results
            })
            connection.release();
          }
        })
      }
    })
  })
}

module.exports = {query};