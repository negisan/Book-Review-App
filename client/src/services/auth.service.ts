import axios from 'axios'
import authHeader from './auth-header'
import { BASE_API_URL } from '../helpers/constant'

interface LoginCredentials {
  email: string
  password: string
}

const login = async (credentials: LoginCredentials) => {
  return await axios({
    method: 'post',
    url: BASE_API_URL + '/signin',
    data: credentials,
  })
    .then((res) => {
      localStorage.setItem('user', JSON.stringify(res.data))
      return Promise.resolve()
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

interface RegisterCredentials {
  name: string
  email: string
  password: string
}

const register = async (credentials: RegisterCredentials) => {
  return await axios({
    method: 'post',
    url: BASE_API_URL + '/users',
    data: credentials,
  })
    .then((res) => {
      localStorage.setItem('user', JSON.stringify(res.data))
      return res.data
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

const fetchUser = async () => {
  try {
    const res = await axios({
      method: 'get',
      url: BASE_API_URL + '/users',
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
  return await axios({
    method: 'put',
    url: BASE_API_URL + '/users',
    headers: authHeader(),
    data: credentials,
  })
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

export default {
  login,
  register,
  fetchUser,
  updateUser,
}
