import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { IoPersonCircleOutline } from 'react-icons/io5'
import { GoLinkExternal } from 'react-icons/go'

import { CustomLoader } from '../components'

import { useReviewsContext } from '../context/reviews.context'

const Review = () => {
  const { fetchReview, review: items, isLoading } = useReviewsContext()
  // @ts-ignore
  const { id } = useParams()
  const { title, url, detail, review, reviewer } = items

  useEffect(() => {
    fetchReview(id)
  }, [id])

  if (isLoading) {
    return <CustomLoader />
  }

  return (
    <div className='section section-center'>
      <Wrapper>
        <Heading>
          <ReviewerInfo>
            <IoPersonCircleOutline size={24} />
            <p>{reviewer}</p>
          </ReviewerInfo>
          <h1 className='title'>{title}</h1>
          <div className='underline'></div>
        </Heading>
        <BookInfoContainer>
          <img src='https://picsum.photos/200/260' alt='picsum' />
          <div>
            <Title>
              <div>
                <h4>{title}</h4>
                {url && (
                  <a href={`${url}`} target='_blank' rel='noopener noreferrer'>
                    <GoLinkExternal size={20} />
                  </a>
                )}
              </div>
              <div className='underline'></div>
            </Title>
            <Detail>
              <h4>Detail</h4>
              <p>{detail}</p>
            </Detail>
          </div>
        </BookInfoContainer>
        <ReviewContainer>
          <h4>Review</h4>
          <p>{review}</p>
        </ReviewContainer>
      </Wrapper>
    </div>
  )
}

const ReviewContainer = styled.div`
  justify-self: start;
  align-self: start;
  h4 {
    text-transform: capitalize;
    font-family: cursive;
    font-size: 1.2rem;
    padding-left: 1rem;
    border-left: 5px solid var(--clr-primary-5);
    margin-bottom: 2rem;
  }
  p {
    color: var(--clr-grey-3);
    padding: 0 1.75rem;
  }
`

const Detail = styled.div`
  h4 {
    font-family: cursive;
    margin-bottom: 0.25rem;
  }
  p {
    letter-spacing: var(--spacing);
    color: var(--clr-grey-3);
  }
`

const Title = styled.div`
  margin-bottom: 2rem;
  font-size: 1.2rem;
  h4 {
    display: inline;
  }
  a {
    color: var(--clr-grey-3);
  }
  svg {
    display: inline;
    vertical-align: middle;
    margin-left: 5px;
    cursor: pointer;
  }
  .underline {
    width: 3rem;
    height: 0.25rem;
    background: var(--clr-primary-5);
    margin-top: 0.5rem;
  }
`

const BookInfoContainer = styled.section`
  width: 80%;
  justify-self: center;
  align-self: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;
  img {
    border-radius: var(--radius);
    box-shadow: var(--light-shadow);
  }
  @media (min-width: 1024px) {
    flex-direction: row;
  }
`

const ReviewerInfo = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  justify-content: start;
  margin-bottom: 1.5rem;
  svg {
    color: var(--clr-grey-3);
  }
`

const Heading = styled.div`
  margin-bottom: 1.75rem;
  h1 {
    letter-spacing: var(--spacing);
  }
  .underline {
    margin-top: 0.75rem;
    width: 100%;
    height: 0.1rem;
    background: var(--clr-primary-3);
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  border: 1px solid var(--clr-grey-5);
  border-radius: var(--radius);
  padding: 3rem;
`

export default Review
