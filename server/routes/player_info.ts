import express, { Response } from 'express'
import axios, { AxiosError } from 'axios'
import dbConnection from '../config/db'

const router = express.Router()
require('dotenv').config()

// R - read
router.get('/', (req, res, next) => {
  type ResultData = {
    name: string,
    videoData: {
      id: number | null, 
      ytId: string, 
      name: string, 
      pic: string
    }[]
  }
  const resultData: ResultData = {
    name: '',
    videoData: [{
      id: null, 
      ytId: '', 
      name: '', 
      pic: ''
    }]
  }
  function getListName(res: Response, listId: number): Promise<{name: string}[]> {
    return new Promise((resolve, reject) => {
      dbConnection.query('SELECT name FROM collection WHERE id = ? LIMIT 1',
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
  function getListInfo(res: Response, listId: number): Promise<{
    id: number, 
    yt_id: string, 
    video_name: string, 
    img_url: string
  }[]> {
    return new Promise((resolve, reject) => {
      dbConnection.query(
        `
          SELECT movies.id, movies.yt_id, movies.video_name, movies.img_url
          FROM collection
          INNER JOIN movies
          ON collection.id = movies.list_id
          WHERE collection.id = ?
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
  async function mixSearch(res: Response, listId: number){
    try {
      const listName = await getListName(res, listId);
      const listInfo = await getListInfo(res, listId);
      resultData.name = listName[0].name
      resultData.videoData = listInfo.map(
        (elem) => ({
          id: elem.id, 
          ytId: elem.yt_id, 
          name: elem.video_name, 
          pic: elem.img_url
        })
      )
      console.log(
        'listName: ', listName, '\n',
        'listInfo: ', listInfo, '\n',
        'resultData: ', resultData, '\n'
      )
      res.json(resultData)
    } catch (err: any) {
      res.status(500).json({msg: err.message})
    }
  }

  try {
    mixSearch(res, Number(req.query.id))
  } catch (err: any) {
    res.status(500).json({msg: err.message})
  }
})

// C - creare
router.post('/', (req, res, next) => {
  // 取得youtube資訊
  function getVideoData(id: string) {
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
  function insertNewVideo(res: Response, {
    listId,
    ytId, 
    videoName, 
    imgUrl
  }: {
    listId?: number, 
    ytId?: string, 
    videoName?: string, 
    imgUrl?: string
  }){
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
  async function mixSearch(
    res: Response,
    {
      listId, 
      ytId
    } : {
      listId: number, 
      ytId: string
    }
  ) {
    const ytData = await getVideoData(ytId)
    if (ytData) {
      const result = await insertNewVideo(
        res,
        {
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
        }
      )
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
    mixSearch(
      res,
      {
        listId: req.body.listId,
        ytId: req.body.ytId,
      }
    )
  } catch (err: any) {
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
    (err, result)=>{
      console.log(req.body)
      if (err) {
        res.status(500).json({msg: err.message})
      }
      res.send('delete successfully')
    }
  )
})

export default router
