import React, { useEffect, useState } from 'react'
import { IoPersonCircleOutline } from 'react-icons/io5'
import { GoLinkExternal } from 'react-icons/go'
import styled from 'styled-components'

import { CustomLoader, ReviewList, UserEditModal } from '../components'

import { useAuthContext } from '../context/auth.context'
import { useReviewsContext } from '../context/reviews.context'

const User = () => {
  const { user } = useAuthContext()
  const { my_reviews, fetchMyReviews, isLoading } = useReviewsContext()
  const [showUserEditModal, setShowUserEditModal] = useState(false)

  const openUserEditModal = () => {
    setShowUserEditModal(true)
  }

  const closeUserEditModal = () => {
    setShowUserEditModal(false)
  }

  useEffect(() => {
    fetchMyReviews()
  }, [])

  return (
    <div className='section section-center'>
      <UserInfoWrapper>
        <IoPersonCircleOutline size={160} />
        <UserNameContainer onClick={openUserEditModal}>
          <GoLinkExternal size={25} />
          <p className='username'>{user.name}</p>
        </UserNameContainer>
        {showUserEditModal && (
          <UserEditModal closeUserEditModal={closeUserEditModal} />
        )}
        <div className='horizon'></div>
      </UserInfoWrapper>
      {isLoading ? <CustomLoader /> : <ReviewList reviews={my_reviews} />}
    </div>
  )
}

const UserNameContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: var(--clr-grey-3);
  cursor: pointer;
  svg {
    align-self: end;
    margin-right: 1.25rem;
  }
`

const UserInfoWrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;
  .username {
    font-size: 1.5rem;
    letter-spacing: var(--spacing);
  }
  .horizon {
    margin-top: 10rem;
    width: 60vw;
    max-width: var(--max-width);
    height: 0.3em;
    background: var(--clr-grey-3);
  }
  svg {
    color: var(--clr-grey-3);
  }
`

export default User
