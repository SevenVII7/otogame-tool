import express from 'express'
import collection from './collection'
import playerInfo from './player_info'

const router = express.Router()

router.use('/collection', collection)
router.use('/player_info', playerInfo)

export default router
