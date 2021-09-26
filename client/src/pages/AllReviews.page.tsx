import React from 'react'
import { AllReviewList } from '../components'
import { useReviewsContext } from '../context/reviews.context'

const AllReviews: React.FC = () => {
  const { loadMoreReviews, AllReviews, hasMoreReviews } = useReviewsContext()

  return (
    <AllReviewList
      loadMore={loadMoreReviews}
      AllReviews={AllReviews}
      hasMore={hasMoreReviews}
      headerTitle={'All Reviews'}
    />
  )
}

export default AllReviews
