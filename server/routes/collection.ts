import express from 'express'
import { Not } from 'typeorm';
import dbConnection from '../config/db'
import { collectionRepo } from "../database/entityManager";

const router = express.Router()

// R - read
router.get('/', async (req, res, next) => {
  try {
    const result = await collectionRepo.find()
    res.json(result)
  } catch (err) {
    res.status(500).json({msg: err})
  }
})

// C - creare
router.post('/', async (req,res, next) => {
  if (!req.body.name) return res.status(402).send('name is required')
  try {
    const allList = await collectionRepo.find();
    if (allList.length >= 5) {
      return res.send('Max to 5 list')
    }

    const existingList = await collectionRepo.findOne({
      where: { name: req.body.name }
    })
    if (existingList) {
      return res.send('Name already exists')
    }

    await collectionRepo.save({
      name: req.body.name
    })
    res.send('Inset successfully')
  } catch (err: any) {
    res.status(500).json({ msg: err.message })
  }
})

// U - update
router.patch('/', async (req, res, next)=>{
  try {
    const updateResult = await collectionRepo.update(
      {
        id: req.body.id, 
        name: Not(req.body.name) 
      },
      { name: req.body.name }
    )
    if (updateResult.affected) {
      res.send('update successfully')
    } else {
      res.send('No updated')
    }
  } catch (err: any) {
    res.status(500).json({ msg: err.message })
  }
})

// D - delete
router.delete('/', (req,res, next)=>{
  dbConnection.query(
    `
      DELETE collection, video
      FROM collection
      LEFT JOIN video ON collection.id = video.list_id
      WHERE collection.id = ?;
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

export default router
