const express = require('express')
const router = express.Router()
const videoList = require('./video_list')
const playerInfo = require('./player_info')

router.use('/video_list', videoList)
router.use('/player_info', playerInfo)

module.exports = router
