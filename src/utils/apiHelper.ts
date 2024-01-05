import axios from 'axios'

const apiBase = axios.create({
  baseURL: `${import.meta.env.VUE_APP_API_KEY}`,
  headers: {
    accept: 'application/json'
  }
})
apiBase.interceptors.response.use(
  (response) => {
    console.log(`⭕ [${response.config.method}] ${response.config.baseURL + response.config.url} - OK: `, response)
    return response;
  },
  (error) => {
    console.log(`❌ [${error.response.config.method}] ${error.response.config.baseURL + error.response.config.url} - Error: `, error)
    return Promise.reject(error);
  }
);

// 取得合輯
export const apiGetCollectionList = () => {
  console.log('apiGetCollectionList')
  return apiBase
    .get('/video_list')
    .then(function (response) {
      return response
    })
    .catch(function (error) {
      return error.response
    })
}

// 建立合輯
export const apiCreateCollection = ({ name }) => {
  console.log('createCollection')
  return apiBase
    .post('/video_list', { name })
    .then(function (response) {
      return response
    })
    .catch(function (error) {
      return error.response
    })
}

// 更新合輯
export const apiUpdateCollection = ({ id, name }) => {
  console.log('apiUpdateCollection')
  return apiBase
    .patch('/video_list', { id, name })
    .then(function (response) {
      return response
    })
    .catch(function (error) {
      return error.response
    })
}

// 刪除合輯
export const apiDeleteCollection = ({ id }) => {
  console.log('apiDeleteCollection')
  return apiBase
    .delete('/video_list', { data: { id } })
    .then(function (response) {
      return response
    })
    .catch(function (error) {
      return error.response
    })
}

// 建立影片
export const apiCreateVideo = ({ ytId, listId }) => {
  console.log('apiCreateVideo')
  return apiBase
    .post('/player_info', { ytId, listId })
    .then(function (response) {
      return response
    })
    .catch(function (error) {
      return error.response
    })
}
