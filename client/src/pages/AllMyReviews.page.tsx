import React from 'react'
import { AllReviewList } from '../components'
import { useReviewsContext } from '../context/reviews.context'

const AllMyReviews: React.FC = () => {
  const { loadMoreMyReviews, AllMyReviews, hasMoreMyReviews } =
    useReviewsContext()
  return (
    <AllReviewList
      loadMore={loadMoreMyReviews}
      AllReviews={AllMyReviews}
      hasMore={hasMoreMyReviews}
      headerTitle={'All My Reviews'}
    />
  )
}

export default AllMyReviews
