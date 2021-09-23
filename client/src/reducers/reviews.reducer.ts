import {
  FETCH_REVIEWS_SUCCESS,
  FETCH_REVIEWS_FAIL,
} from '../constants/reviews.constants'

// @ts-ignore
const reviews_reducer = (state, action) => {
  if (action.type === FETCH_REVIEWS_SUCCESS) {
    return { ...state, reviews: action.payload }
  }
  if (action.type === FETCH_REVIEWS_FAIL) {
    return { ...state, reviews_error: action.payload }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}
export default reviews_reducer
