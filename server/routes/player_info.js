const express = require('express')
const router = express.Router()
const axios = require('axios')
const dbConnection = require('../config/db')
require('dotenv').config()

// R - read
router.get('/', (req, res, next) => {
  const resultData = {}
  function getListName(res, listId) {
    return new Promise((resolve, reject) => {
      dbConnection.query('SELECT name FROM movie_list WHERE id = ? LIMIT 1',
        [listId],
        (err, results) => {
          if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.status(400).json({msg: 'failed'})
          } else {
            resolve(results);
          }
        }
      );
    });
  }
  function getListInfo(res, listId) {
    return new Promise((resolve, reject) => {
      dbConnection.query(
        `
          SELECT movies.id, movies.yt_id, movies.video_name, movies.img_url
          FROM movie_list
          INNER JOIN movies
          ON movie_list.id = movies.list_id
          WHERE movie_list.id = ?
        `,
        [listId],
        (err, results) => {
          if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.status(400).json({msg: 'failed'})
          } else {
            resolve(results);
          }
        }
      );
    });
  }
  async function mixSearch(res, listId){
    try {
      const listName = await getListName(res, listId);
      const listInfo = await getListInfo(res, listId);
      resultData.name = listName[0].name
      resultData.videoData = listInfo.map(
        (elem) => ({
          id: elem.id, yt_id: elem.yt_id, name: elem.video_name, pic: elem.img_url
        })
      )
      console.log(
        'listName: ', listName, '\n',
        'listInfo: ', listInfo, '\n',
        'resultData: ', resultData, '\n'
      )
      res.json(resultData)
    } catch (err) {
      res.status(500).json({msg: err.message})
    }
  }

  try {
    mixSearch(res, req.query.id)
  } catch (err) {
    res.status(500).json({msg: err.message})
  }
})

// C - creare
router.post('/', (req, res, next) => {
  // 取得youtube資訊
  function getVideoData(id) {
    return axios.get(
      `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${process.env.YT_KEY}&part=snippet,contentDetails,statistics,status`
    ).then((response) => {
      try {
        return response.data.items[0].snippet
      } catch (err) {
        return null
      }
    }).catch((err) => {
      console.log(err)
      return null
    })
  }
  // 寫入資料庫
  function insertNewVideo({res, listId, ytId, videoName, imgUrl} = {}){
    return new Promise((resolve, reject) => {
      dbConnection.query(
        'INSERT INTO movies(list_id, yt_id, video_name, img_url) VALUES(?,?,?,?)',
        [ listId, ytId, videoName, imgUrl ],
        (err, results) => {
          if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.status(400).json({msg: err.message})
          } else {
            resolve({msg: 'insert success'});
          }
        }
      )
    })
  }
  // 執行
  async function mixSearch({res, listId, ytId} = {}) {
    const ytData = await getVideoData(ytId)
    if (ytData) {
      const result = await insertNewVideo({
        res,
        listId,
        ytId, 
        videoName: ytData.title,
        imgUrl: (() => {
          if (ytData.thumbnails?.standard?.url) {
            return ytData.thumbnails?.standard?.url
          } else if (ytData.thumbnails?.medium?.url) {
            return ytData.thumbnails?.medium?.url
          } else if (ytData.thumbnails?.default?.url) {
            return ytData.thumbnails?.default?.url
          }
        })()
      })
      console.log(
        'ytData', ytData, '\n',
        'result', result
      )
      res.json(result)
    } else {
      res.status(400).json({msg: 'Can not get youtube video'})
    }
  }
  try {
    mixSearch({
      res,
      listId: req.body.listId,
      ytId: req.body.ytId,
    })
  } catch (err) {
    res.status(500).json({msg: err.message})
  }
})

// D - delete
router.delete('/', (req, res, next) => {
  dbConnection.query(
    `
      DELETE FROM movies WHERE movies.id = ?;
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
