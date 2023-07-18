/*
 * @Description: 
 * @Author: huazj
 * @Date: 2023-07-05 11:43:27
 * @LastEditTime: 2023-07-18 10:34:35
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
        resolve({
          code: 500,
          results: err.sqlMessage
        })
      } else {
        connection.query(sql, values, (err, results) => {
          if(err) {
            resolve({
              code: 400,
              results: err.sqlMessage
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