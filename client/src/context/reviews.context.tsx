import React, { useContext, useReducer, useState } from 'react'
import { useHistory } from 'react-router'

import reducer from '../reducers/reviews.reducer'
import {
  FETCH_REVIEWS_SUCCESS,
  FETCH_MYREVIEWS_SUCCESS,
  FETCH_REVIEW_SUCCESS,
} from '../constants/reviews.constants'
import ReviewService from '../services/review.service'
import { useUIContext } from './UI.context'

const initialState = {
  reviews: [],
  my_reviews: [],
  review: '',
}

const ReviewsContext = React.createContext<any | null>(null)

export const ReviewsProvider = ({ children }: any) => {
  // @ts-ignore
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isLoading, setIsLoading] = useState(false)
  const { toastError, toastSuccess } = useUIContext()
  const history = useHistory()

  const fetchReviews = async () => {
    setIsLoading(true)
    await ReviewService.fetchReviews()
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
    await ReviewService.fetchMyReviews()
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

  const fetchReview = async (id: string) => {
    setIsLoading(true)
    await ReviewService.fetchReview(id)
      .then((review) => {
        dispatch({ type: FETCH_REVIEW_SUCCESS, payload: review })
        setIsLoading(false)
      })
      .catch((err) => {
        const message =
          err.response?.data?.ErrorMessageJP || err.message || err.toString()
        toastError(message)
        setIsLoading(false)
      })
  }

  interface ReviewData {
    title: string
    url: string
    detail: string
    review: string
  }

  const createReview = async (values: ReviewData) => {
    setIsLoading(true)
    await ReviewService.createReview(values)
      .then(() => {
        toastSuccess('レビューを投稿しました')
        history.push('/')
        setIsLoading(false)
      })
      .catch((err) => {
        const message =
          err.response?.data?.ErrorMessageJP || err.message || err.toString()
        toastError(message)
        setIsLoading(false)
      })
  }

  return (
    <ReviewsContext.Provider
      value={{
        ...state,
        fetchReviews,
        fetchMyReviews,
        fetchReview,
        createReview,
        isLoading,
      }}
    >
      {children}
    </ReviewsContext.Provider>
  )
}

export const useReviewsContext = () => {
  return useContext(ReviewsContext)
}
