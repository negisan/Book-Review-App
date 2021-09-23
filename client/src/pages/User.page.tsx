import React, { useEffect } from 'react'
import { IoPersonCircleOutline } from 'react-icons/io5'
import { GoLinkExternal } from 'react-icons/go'
import styled from 'styled-components'
import { CustomLoader, ReviewList } from '../components'
import { Link } from 'react-router-dom'

import { useAuthContext } from '../context/auth.context'
import { useReviewsContext } from '../context/reviews.context'

const User = () => {
  const { user } = useAuthContext()
  const { my_reviews, fetchMyReviews, isLoading } = useReviewsContext()

  useEffect(() => {
    fetchMyReviews()
  }, [])

  if (isLoading) {
    return <CustomLoader />
  }

  return (
    <div className='section section-center'>
      <UserInfoWrapper>
        <IoPersonCircleOutline size={160} />
        <Link to={`/user/${user.name}/edit`}>
          <UserNameContainer>
            <GoLinkExternal size={25} />
            <p className='username'>{user.name}</p>
          </UserNameContainer>
        </Link>
        <div className='horizon'></div>
      </UserInfoWrapper>
      <ReviewList reviews={my_reviews} />
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
