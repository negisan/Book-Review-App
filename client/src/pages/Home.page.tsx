import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { useReviewsContext } from '../context/reviews.context'

import heroImg from '../images/home-hero.jpg'
import { CustomLoader, ReviewList } from '../components'

const Home: React.FC = () => {
  const [heroVisible, setHeroVisible] = useState(false)
  const { reviews, fetchReviews, isLoading } = useReviewsContext()

  useEffect(() => {
    setHeroVisible(true)
  }, [])

  useEffect(() => {
    fetchReviews()
  }, [])

  return (
    <Wrapper>
      <HeroContainer>
        <img
          src={heroImg}
          alt='hero'
          className={`${heroVisible ? 'hero-img hero-visible' : 'hero-img'}`}
        />
        <p className='hero-phrase'>Review</p>
      </HeroContainer>
      <div className='section-center'>
        {isLoading ? (
          <CustomLoader />
        ) : (
          <ReviewList reviews={reviews} viewMoreLink={'/allreviews'} />
        )}
      </div>
    </Wrapper>
  )
}

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
