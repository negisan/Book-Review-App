import {
  FETCH_REVIEWS_SUCCESS,
  FETCH_MYREVIEWS_SUCCESS,
  FETCH_REVIEW_SUCCESS,
  UPDATE_REVIEW_SUCCESS,
} from '../constants/reviews.constants'

// @ts-ignore
const reviews_reducer = (state, action) => {
  if (action.type === FETCH_REVIEWS_SUCCESS) {
    return { ...state, reviews: action.payload }
  }
  if (action.type === FETCH_MYREVIEWS_SUCCESS) {
    return { ...state, my_reviews: action.payload }
  }
  if (action.type === FETCH_REVIEW_SUCCESS) {
    return { ...state, review: action.payload }
  }
  if (action.type === UPDATE_REVIEW_SUCCESS) {
    return { ...state, review: action.payload }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}
export default reviews_reducer
