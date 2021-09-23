import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { IoPersonCircleOutline } from 'react-icons/io5'

import { useReviewsContext } from '../context/reviews.context'

import heroImg from '../images/home-hero.jpg'
import { CustomLoader } from '../components'

const Home: React.FC = () => {
  const [heroVisible, setHeroVisible] = useState(false)
  const { reviews, fetchReviews, isLoading } = useReviewsContext()

  useEffect(() => {
    setHeroVisible(true)
  }, [])

  useEffect(() => {
    fetchReviews()
  }, [])

  if (isLoading) {
    return <CustomLoader />
  }

  return (
    <Wrapper>
      {/* hero */}
      <HeroContainer>
        <img
          src={heroImg}
          alt='hero'
          className={`${heroVisible ? 'hero-img hero-visible' : 'hero-img'}`}
        />
        <p className='hero-phrase'>Review</p>
      </HeroContainer>
      <div className='section-center'>
        <ReviewListWrapper>
          <Heading>
            <h1>reviews</h1>
            <div className='underline'></div>
            <span className='view-more'>ViewMore</span>
          </Heading>
          <ReviewListContainer>
            {/* @ts-ignore */}
            {reviews.map((review) => {
              const { id, title, reviewer } = review
              return (
                <Link to={`/review/${id}`} key={id}>
                  <ReviewContainer>
                    <h4 className='book-title'>{title}</h4>
                    <span className='reviewer'>
                      <IoPersonCircleOutline size={20} />
                      {reviewer}
                    </span>
                    <img src='https://picsum.photos/200/260' alt='picsum' />
                  </ReviewContainer>
                </Link>
              )
            })}
          </ReviewListContainer>
          <ViewMoreMoble>ViewMore</ViewMoreMoble>
        </ReviewListWrapper>
      </div>
    </Wrapper>
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

const HeroContainer = styled.div`
  position: relative;
  .hero-img {
    width: 100vw;
    height: 80vh;
    object-fit: cover;
    opacity: 0;
  }
  .hero-visible {
    opacity: 1;
    animation-duration: 2s;
    animation-name: fade-in;
  }
  @keyframes fade-in {
    0% {
      display: none;
      opacity: 0;
    }

    1% {
      display: block;
      opacity: 0;
    }

    100% {
      display: block;
      opacity: 1;
    }
  }
  .hero-phrase {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    font-family: cursive;
    font-size: 4rem;
    text-transform: uppercase;
    letter-spacing: var(--spacing);
    color: var(--clr-white);
  }
`

const Wrapper = styled.div``

export default Home
