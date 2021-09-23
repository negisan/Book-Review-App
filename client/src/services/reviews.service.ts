import axios from 'axios'
import authHeader from './auth-header'

const BASE_API_URL = 'https://api-for-missions-and-railways.herokuapp.com/'

const fetchReviews = async () => {
  try {
    const res = await axios.get(`${BASE_API_URL}/public/books?offset=20`)
    return res.data
  } catch (error) {
    return error
  }
}

const fetchMyReviews = async () => {
  try {
    const res = await axios.get(`${BASE_API_URL}/books`, {
      headers: authHeader(),
    })
    return res.data
  } catch (error) {
    return error
  }
}

export default {
  fetchReviews,
  fetchMyReviews,
}
