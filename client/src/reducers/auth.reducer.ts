import {
  REGISTER_FAIL,
  LOGIN_FAIL,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
  LOGOUT,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
} from '../constants/auth.constants'

// @ts-ignore
const auth_reducer = (state, action) => {
  if (action.type === LOGOUT) {
    return {}
  }
  if (action.type === FETCH_USER_SUCCESS) {
    return { ...state, user: action.payload }
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    return { ...state, user: action.payload }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}
export default auth_reducer
