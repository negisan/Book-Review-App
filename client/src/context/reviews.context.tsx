import React, { useContext, useReducer, useState } from 'react'

import reducer from '../reducers/reviews.reducer'
import {
  FETCH_REVIEWS_SUCCESS,
  FETCH_REVIEWS_FAIL,
} from '../constants/reviews.constants'
import ReviewsService from '../services/reviews.service'

const initialState = {
  reviews: [],
  reviews_error: '',
  my_reviews: [],
  my_reviews_error: '',
  review: [],
  review_error: '',
}

const ReviewsContext = React.createContext<any | null>(null)

export const ReviewsProvider = ({ children }: any) => {
  // @ts-ignore
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isLoading, setIsLoading] = useState(false)

  const fetchReviews = async () => {
    setIsLoading(true)
    try {
      const reviews = await ReviewsService.fetchReviews()
      console.log(reviews)
      dispatch({ type: FETCH_REVIEWS_SUCCESS, payload: reviews })
      setIsLoading(false)
    } catch (error) {
      dispatch({ type: FETCH_REVIEWS_FAIL, payload: error })
      setIsLoading(false)
    }
  }

  return (
    <ReviewsContext.Provider value={{ ...state, fetchReviews, isLoading }}>
      {children}
    </ReviewsContext.Provider>
  )
}

export const useReviewsContext = () => {
  return useContext(ReviewsContext)
}
