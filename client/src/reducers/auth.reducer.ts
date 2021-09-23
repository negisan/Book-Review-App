import {
  REGISTER_FAIL,
  LOGIN_FAIL,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
  LOGOUT,
} from '../constants/auth.constants'

// @ts-ignore
const auth_reducer = (state, action) => {
  if (action.type === REGISTER_FAIL) {
    return { ...state, register_error: action.payload }
  }
  if (action.type === LOGIN_FAIL) {
    return { ...state, login_error: action.payload }
  }
  if (action.type === LOGOUT) {
    return {}
  }
  if (action.type === FETCH_USER_SUCCESS) {
    return { ...state, user: action.payload }
  }
  if (action.type === FETCH_USER_FAIL) {
    return { ...state, user_error: action.payload }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}
export default auth_reducer
