import React, { useContext, useReducer, useState } from 'react'

import reducer from '../reducers/reviews.reducer'
import {
  FETCH_REVIEWS_SUCCESS,
  FETCH_REVIEWS_FAIL,
  FETCH_MYREVIEWS_SUCCESS,
} from '../constants/reviews.constants'
import ReviewsService from '../services/reviews.service'
import { useUIContext } from './UI.context'

const initialState = {
  reviews: [],
  my_reviews: [],
  review: [],
}

const ReviewsContext = React.createContext<any | null>(null)

export const ReviewsProvider = ({ children }: any) => {
  // @ts-ignore
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isLoading, setIsLoading] = useState(false)
  const { toastError } = useUIContext()

  const fetchReviews = async () => {
    setIsLoading(true)
    await ReviewsService.fetchReviews()
      .then((reviews) => {
        dispatch({ type: FETCH_REVIEWS_SUCCESS, payload: reviews })
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

  const fetchMyReviews = async () => {
    setIsLoading(true)
    await ReviewsService.fetchMyReviews()
      .then((reviews) => {
        dispatch({ type: FETCH_MYREVIEWS_SUCCESS, payload: reviews })
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

  return (
    <ReviewsContext.Provider
      value={{ ...state, fetchReviews, fetchMyReviews, isLoading }}
    >
      {children}
    </ReviewsContext.Provider>
  )
}

export const useReviewsContext = () => {
  return useContext(ReviewsContext)
}
