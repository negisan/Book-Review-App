import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { IoPersonCircleOutline } from 'react-icons/io5'

interface ReviewData {
  id: string
  title: string
  detail: string
  url: string
  review: string
  reviewer: string
}

const ReviewList = (props: any) => {
  const reviews = props.reviews
  const viewMoreLink = props.viewMoreLink || '#'

  return (
    <ReviewListWrapper>
      <Heading>
        <h1>reviews</h1>
        <div className='underline'></div>
        <Link to={viewMoreLink}>
          <span className='view-more'>ViewMore</span>
        </Link>
      </Heading>
      <ReviewListContainer>
        {reviews.map((review: ReviewData) => {
          const { id, title, reviewer } = review
          const randamNum = Math.floor(Math.random() * 100)
          const picsum = `https://picsum.photos/id/${randamNum}/200/260`
          return (
            <Link to={`/review/${id}`} key={id}>
              <ReviewContainer>
                <h4 className='book-title'>{title}</h4>
                <span className='reviewer'>
                  <IoPersonCircleOutline size={20} />
                  {reviewer}
                </span>
                <div className='img-wrap'>
                  <img src={picsum} alt='picsum' />
                </div>
              </ReviewContainer>
            </Link>
          )
        })}
      </ReviewListContainer>
      <ViewMoreMoble>ViewMore</ViewMoreMoble>
    </ReviewListWrapper>
  )
}

const ViewMoreMoble = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.25rem;
  color: var(--clr-grey-3);
  margin-top: 3rem;
  cursor: pointer;
  @media (min-width: 425px) {
    display: none;
  }
`

const Heading = styled.div`
  margin-bottom: 3rem;
  h1 {
    color: var(--clr-grey-3);
    font-weight: 400;
    letter-spacing: var(--spacing);
    text-transform: capitalize;
  }
  .underline {
    width: 2em;
    height: 0.3rem;
    background: var(--clr-primary-7);
  }

  .view-more {
    display: none;
  }
  @media (min-width: 425px) {
    position: relative;
    .view-more {
      display: block;
      position: absolute;
      top: 3rem;
      right: -6rem;
      transform: rotate(90deg) translateX(0);
      font-size: 1.35rem;
      font-family: cursive;
      color: var(--clr-grey-3);
      cursor: pointer;
      transition: var(--transition);
      &:hover {
        color: var(--clr-grey-5);
      }
    }
  }
`

const ReviewContainer = styled.div`
  .img-wrap {
    width: 200px;
    height: 260px;
    background: lightgrey;
  }
  img {
    border-radius: var(--radius);
    box-shadow: var(--dark-shadow);
    opacity: 0.4;
    cursor: pointer;
    transition: var(--transition);
    &:hover {
      opacity: 1;
    }
  }
  position: relative;
  .book-title {
    position: absolute;
    top: 0.75rem;
    left: 1.25rem;
    color: var(--clr-black);
    font-size: 1.15rem;
    z-index: 10;
  }
  .reviewer {
    position: absolute;
    bottom: 0.75rem;
    right: 1.25rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
    color: var(--clr-black);
    z-index: 10;
  }
`

const ReviewListContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  gap: 2.5rem;
`
const ReviewListWrapper = styled.section`
  margin-top: 10rem;
  margin-bottom: 10rem;
  padding: 0 6rem;
`

export default ReviewList
