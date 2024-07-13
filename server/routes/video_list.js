const express = require('express')
const router = express.Router()
const dbConnection = require('../config/db')

// R - read
router.get('/', (req, res, next) => {
  //query('sql',(err,result))
  dbConnection.query(
    'SELECT * FROM movie_list ORDER BY created_at DESC',
    (err, result) => {
      if (err) {
        res.status(500).json({msg: err.message})
      }
      res.json(result)
    }
  )
})

// C - creare
router.post('/', (req,res, next) => {
  if (req.body.name) {
    dbConnection.query(
      'INSERT INTO movie_list(name) VALUES(?)',
      [
        req.body.name,
      ],
      (err, result) => {
        if (err) {
          res.status(500).json({msg: err.message})
        }
        res.send('inset successfully')
      }
    )
  } else {
    res.status(402)
    res.send('failed')
  }
})

// U - update
router.patch('/', (req, res, next)=>{
  dbConnection.query(
    'UPDATE movie_list set name=? where id=?',
    [
      req.body.name,
      req.body.id,
    ],
    (err,result)=>{
      if (err) {
        res.status(500).json({msg: err.message})
      }
      res.send('update successfully')
    }
  )
})

// D - delete
router.delete('/', (req,res, next)=>{
  dbConnection.query(
    `
      DELETE movie_list, movies
      FROM movie_list
      LEFT JOIN movies ON movie_list.id = movies.list_id
      WHERE movie_list.id = ?;
    `,
    [
      req.body.id,
    ],
    (err,result)=>{
      console.log(req.body)
      if (err) {
        res.status(500).json({msg: err.message})
      }
      res.send('delete successfully')
    }
  )
})

module.exports = router
