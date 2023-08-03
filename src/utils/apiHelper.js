import axios from 'axios'

const apiBase = axios.create({
  baseURL: `${process.env.VUE_APP_API_KEY}`,
  headers: {
    accept: 'application/json'
  }
})

export const apiGetCollectionList = () => {
  console.log('apiGetCollectionList')
  return apiBase
    .get('/video_list')
    .then(function (response) {
      console.log('apiGetCollectionList - then', response)
      return response
    })
    .catch(function (error) {
      console.log('apiGetCollectionList - error', error.response)
      return error.response
    })
}

export const apiCreateCollection = ({ name }) => {
  console.log('createCollection')
  return apiBase
    .post('/video_list', { name })
    .then(function (response) {
      console.log('createCollection - then', response)
      return response
    })
    .catch(function (error) {
      console.log('createCollection - error', error.response)
      return error.response
    })
}

export const apiUpdateCollection = ({id, name}) => {
  console.log('apiUpdateCollection')
  return apiBase
    .patch('/video_list', { id, name })
    .then(function (response) {
      console.log('apiUpdateCollection - then', response)
      return response
    })
    .catch(function (error) {
      console.log('apiUpdateCollection - error', error.response)
      return error.response
    })
}
