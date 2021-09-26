import {
  FETCH_REVIEWS_SUCCESS,
  FETCH_MYREVIEWS_SUCCESS,
  FETCH_REVIEW_SUCCESS,
  UPDATE_REVIEW_SUCCESS,
  DELETE_REVIEW_SUCCESS,
  FETCH_MORE_REVIEWS_SUCCESS,
  FETCH_MORE_REVIEWS_FAIL,
  FETCH_MORE_MYREVIEWS_SUCCESS,
  FETCH_MORE_MYREVIEWS_FAIL,
} from '../constants/reviews.constants'

const reviews_reducer = (state: any, action: any) => {
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
  if (action.type === DELETE_REVIEW_SUCCESS) {
    return { ...state, review: '' }
  }
  if (action.type === FETCH_MORE_REVIEWS_SUCCESS) {
    return { ...state, AllReviews: state.AllReviews.concat(action.payload) }
  }
  if (action.type === FETCH_MORE_REVIEWS_FAIL) {
    return { ...state, hasMoreReviews: false }
  }
  if (action.type === FETCH_MORE_MYREVIEWS_SUCCESS) {
    return { ...state, AllMyReviews: state.AllMyReviews.concat(action.payload) }
  }
  if (action.type === FETCH_MORE_MYREVIEWS_FAIL) {
    return { ...state, hasMoreMyReviews: false }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}
export default reviews_reducer
