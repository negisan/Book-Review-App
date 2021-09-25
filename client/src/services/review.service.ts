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

const fetchReview = async (id: string) => {
  return await axios({
    method: 'get',
    url: BASE_API_URL + 'books/' + id,
    headers: authHeader(),
    data: { id: id },
  })
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

interface ReviewData {
  title: string
  url: string
  detail: string
  review: string
}

const createReview = async (values: ReviewData) => {
  return await axios({
    method: 'post',
    url: BASE_API_URL + 'books',
    headers: authHeader(),
    data: JSON.stringify(values),
  })
    .then((res) => {
      console.log(res)

      return Promise.resolve()
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

const updateReview = async (id: string, values: ReviewData) => {
  return await axios({
    method: 'put',
    url: BASE_API_URL + 'books/' + id,
    headers: authHeader(),
    data: JSON.stringify(Object.assign({}, { id: id }, values)),
  })
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

export default {
  updateReview,
  createReview,
  fetchReviews,
  fetchMyReviews,
  fetchReview,
}
