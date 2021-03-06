import axios from 'axios'
import authHeader from './auth-header'
import { BASE_API_URL } from '../helpers/constant'

const fetchReviews = async () => {
  return await axios
    .get(`${BASE_API_URL}/public/books`)
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

const fetchMyReviews = async () => {
  return await axios({
    method: 'get',
    url: BASE_API_URL + '/books',
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
    url: BASE_API_URL + '/books/' + id,
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
    url: BASE_API_URL + '/books',
    headers: authHeader(),
    data: values,
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
    url: BASE_API_URL + '/books/' + id,
    headers: authHeader(),
    data: Object.assign({}, { id: id }, values),
  })
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

const deleteReview = async (id: string) => {
  return await axios({
    method: 'delete',
    url: BASE_API_URL + '/books/' + id,
    headers: authHeader(),
    data: { id: id },
  })
    .then(() => {
      return Promise.resolve()
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

const loadMoreReviews = async (page: string) => {
  let offset = ((parseInt(page, 10) - 1) * 10).toString()
  return await axios({
    method: 'get',
    url: BASE_API_URL + '/public/books?offset=' + offset,
  })
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

const loadMoreMyReviews = async (page: string) => {
  let offset = ((parseInt(page, 10) - 1) * 10).toString()
  return await axios({
    method: 'get',
    url: BASE_API_URL + '/books?offset=' + offset,
    headers: authHeader(),
  })
    .then((res) => {
      const myreviews = res.data.filter((review: any) => review.isMine === true)
      return Promise.resolve(myreviews)
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

export default {
  loadMoreMyReviews,
  loadMoreReviews,
  deleteReview,
  updateReview,
  createReview,
  fetchReviews,
  fetchMyReviews,
  fetchReview,
}
