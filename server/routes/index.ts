import express from 'express'
import videoList from './video_list'
import playerInfo from './player_info'

const router = express.Router()

router.use('/video_list', videoList)
router.use('/player_info', playerInfo)

export default router
