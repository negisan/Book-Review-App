import React, { useContext, useState, useReducer, useEffect } from 'react'
import { useHistory } from 'react-router'

import AuthService from '../services/auth.service'
import reducer from '../reducers/auth.reducer'
import {
  REGISTER_FAIL,
  LOGIN_FAIL,
  LOGOUT,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
} from '../constants/auth.constants'

const initialState = {
  register_error: '',
  login_error: '',
  user_error: '',
  user: '',
}

const AuthContext = React.createContext<any | null>(null)

export const AuthProvider = ({ children }: any) => {
  // @ts-ignore
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isLoading, setIsLoading] = useState(false)
  const history = useHistory()

  interface registerCredentials {
    name: string
    email: string
    password: string
  }

  const register = async (credentials: registerCredentials) => {
    setIsLoading(true)
    try {
      const user = await AuthService.register(credentials)
      if (user.token) {
        try {
          const user_info = await AuthService.fetchUser()
          dispatch({ type: FETCH_USER_SUCCESS, payload: user_info })
          setIsLoading(false)
        } catch (error) {
          dispatch({ type: FETCH_USER_FAIL, payload: error })
          setIsLoading(false)
        }
      }
    } catch (error) {
      dispatch({ type: REGISTER_FAIL, payload: error })
      setIsLoading(false)
    }
  }

  interface loginCredentials {
    email: string
    password: string
  }

  const login = async (credentials: loginCredentials) => {
    setIsLoading(true)
    try {
      const user = await AuthService.login(credentials)
      if (user.token) {
        try {
          const user_info = await AuthService.fetchUser()
          dispatch({ type: FETCH_USER_SUCCESS, payload: user_info })
          setIsLoading(false)
        } catch (error) {
          dispatch({ type: FETCH_USER_FAIL, payload: error })
          setIsLoading(false)
        }
      }
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error })
      setIsLoading(false)
    }
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
    try {
      const user = await AuthService.updateUser(credentials)
      console.log(user)

      dispatch({ type: UPDATE_USER_SUCCESS, payload: user })
      setIsLoading(false)
    } catch (error) {
      dispatch({ type: UPDATE_USER_FAIL, payload: error })
      setIsLoading(false)
    }
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
          dispatch({ type: FETCH_USER_FAIL, payload: error })
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
