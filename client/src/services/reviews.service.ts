import axios from 'axios'
import authHeader from './auth-header'

const BASE_API_URL = 'https://api-for-missions-and-railways.herokuapp.com/'

const fetchReviews = async () => {
  return await axios
    .get(`${BASE_API_URL}/public/books?offset=20`)
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

const fetchMyReviews = async () => {
  return await axios
    .get(`${BASE_API_URL}/books`, {
      headers: authHeader(),
    })
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}

export default {
  fetchReviews,
  fetchMyReviews,
}
