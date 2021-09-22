import axios from 'axios'
import authHeader from './auth-header'

const BASE_API_URL = 'https://api-for-missions-and-railways.herokuapp.com/'

interface loginCredentials {
  email: string
  password: string
}

const login = async (credentials: loginCredentials) => {
  try {
    const res = await axios.post(
      BASE_API_URL + 'signin',
      JSON.stringify(credentials)
    )
    if (res.data.token) {
      localStorage.setItem('user', JSON.stringify(res.data))
      return res.data
    }
  } catch (error) {
    return error
  }
}

interface registerCredentials {
  name: string
  email: string
  password: string
}

const register = async (credentials: registerCredentials) => {
  try {
    const res = await axios.post(
      BASE_API_URL + 'users',
      JSON.stringify(credentials)
    )
    if (res.data.token) {
      localStorage.setItem('user', JSON.stringify(res.data))
      return res.data
    }
  } catch (error) {
    return error
  }
}

const fetchUser = async () => {
  try {
    const res = await axios.get(BASE_API_URL + 'users', {
      headers: authHeader(),
    })
    if (res.data) {
      return res.data
    }
  } catch (error) {
    return error
  }
}

export default {
  login,
  register,
  fetchUser,
}
