import axios from 'axios'
import authHeader from './auth-header'
import { BASE_API_URL } from '../helpers/constant'

interface LoginCredentials {
  email: string
  password: string
}

const login = async (credentials: LoginCredentials) => {
  return await axios
    .post(BASE_API_URL + '/signin', JSON.stringify(credentials))
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
  return await axios
    .post(BASE_API_URL + '/users', JSON.stringify(credentials))
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
    const res = await axios.get(BASE_API_URL + '/users', {
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
    data: JSON.stringify(credentials),
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
