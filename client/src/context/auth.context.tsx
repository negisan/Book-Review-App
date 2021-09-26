import React, { useContext, useState, useReducer, useEffect } from 'react'
import { useHistory } from 'react-router'

import AuthService from '../services/auth.service'
import reducer from '../reducers/auth.reducer'
import {
  LOGOUT,
  FETCH_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
} from '../constants/auth.constants'
import { useUIContext } from './UI.context'

const initialState = {
  user: '',
}

const AuthContext = React.createContext<any | null>(null)

export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isLoading, setIsLoading] = useState(false)
  const { toastSuccess, toastError } = useUIContext()
  const history = useHistory()

  interface registerCredentials {
    name: string
    email: string
    password: string
  }

  const register = async (credentials: registerCredentials) => {
    setIsLoading(true)
    await AuthService.register(credentials)
      .then(() => {
        AuthService.fetchUser()
          .then((user_info) => {
            dispatch({ type: FETCH_USER_SUCCESS, payload: user_info })
            toastSuccess('ようこそ ' + user_info.name + ' さん')
            history.replace('/')
            setIsLoading(false)
          })
          .catch((error) => {
            const message =
              error.response?.data?.ErrorMessageJP ||
              error.message ||
              error.toString()
            toastError(message)
            setIsLoading(false)
          })
      })
      .catch((error) => {
        const message =
          error.response?.data?.ErrorMessageJP ||
          error.message ||
          error.toString()
        toastError(message)
        setIsLoading(false)
      })
  }

  interface loginCredentials {
    email: string
    password: string
  }

  const login = async (credentials: loginCredentials) => {
    setIsLoading(true)
    await AuthService.login(credentials)
      .then(() => {
        AuthService.fetchUser()
          .then((user_info) => {
            dispatch({ type: FETCH_USER_SUCCESS, payload: user_info })
            toastSuccess('ログインしました')
            history.replace('/')
            setIsLoading(false)
          })
          .catch((error) => {
            const message =
              error.response?.data?.ErrorMessageJP ||
              error.message ||
              error.toString()
            toastError(message)
            setIsLoading(false)
          })
      })
      .catch((error) => {
        const message =
          error.response?.data?.ErrorMessageJP ||
          error.message ||
          error.toString()
        toastError(message)
        setIsLoading(false)
      })
  }

  const logout = () => {
    localStorage.removeItem('user')
    dispatch({ type: LOGOUT })
    history.push('/login')
  }

  interface UserCredentials {
    name: string
  }

  const updateUser = async (credentials: UserCredentials) => {
    setIsLoading(true)
    await AuthService.updateUser(credentials)
      .then((user) => {
        dispatch({ type: UPDATE_USER_SUCCESS, payload: user })
        toastSuccess('ユーザー情報を更新しました')
        history.push(`/user/${user.name}`)
        setIsLoading(false)
      })
      .catch((error) => {
        const message =
          error.response?.data?.ErrorMessageJP ||
          error.message ||
          error.toString()
        toastError(message)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setIsLoading(true)
      AuthService.fetchUser().then(
        (user_info) => {
          dispatch({ type: FETCH_USER_SUCCESS, payload: user_info })
          setIsLoading(false)
          return Promise.resolve()
        },
        (error) => {
          const message =
            error.response?.data?.ErrorMessageJP ||
            error.message ||
            error.toString()
          toastError(message)
          setIsLoading(false)
          return Promise.reject()
        }
      )
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        login,
        register,
        logout,
        updateUser,
        isLoading,
        ...state,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  return useContext(AuthContext)
}
