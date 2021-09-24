import axios from 'axios'
import authHeader from './auth-header'

const BASE_API_URL = 'https://api-for-missions-and-railways.herokuapp.com/'

interface LoginCredentials {
  email: string
  password: string
}

const login = async (credentials: LoginCredentials) => {
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

interface RegisterCredentials {
  name: string
  email: string
  password: string
}

const register = async (credentials: RegisterCredentials) => {
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

interface UserCredentials {
  name: string
}

const updateUser = async (credentials: UserCredentials) => {
  try {
    const res = await axios({
      method: 'put',
      url: BASE_API_URL + 'users',
      headers: authHeader(),
      data: JSON.stringify(credentials),
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
  updateUser,
}
