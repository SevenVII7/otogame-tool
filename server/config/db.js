const mysql = require('mysql')
require('dotenv').config()
// const config = require('config')

// const dbConnection = mysql.createConnection({
  // host: config.get('host'),
  // user: config.get('user'),
  // password: config.get('password'),
  // database: config.get('database')
// })

const dbConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE
})


dbConnection.connect((err) => {
  if (err) {
    throw err
  } 
  console.log('database connected')
})

module.exports = dbConnection