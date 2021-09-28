import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { IoPersonCircleOutline } from 'react-icons/io5'

interface ReviewItem {
  id: string
  title: string
  detail: string
  reviewer: string
}

const AllReviewList: React.FC<any> = (props) => {
  const { loadMore, AllReviews, hasMore, headerTitle } = props
  console.log(AllReviews)

  const items = (
    <ListContainer>
      {AllReviews?.map((value: ReviewItem, index: string) => {
        const { id, title, detail, reviewer } = value
        const randamNum = Math.floor(Math.random() * 100)
        const picsum = `https://picsum.photos/id/${randamNum}/200/260`
        return (
          <ListItemWrapper key={index}>
            <ReviewerInfo>
              <IoPersonCircleOutline size={20} />
              <p className='reviewer'>{reviewer}</p>
            </ReviewerInfo>
            <ListItemContainer>
              <Link to={`/review/${id}`}>
                <img src={picsum} className='img' alt='picsum' />
              </Link>
              <BookInfoContainer>
                <Title>
                  <h3>{title}</h3>
                  <div className='underline'></div>
                </Title>
                <p className='detail'>{detail?.substring(0, 80)}...</p>
              </BookInfoContainer>
            </ListItemContainer>
          </ListItemWrapper>
        )
      })}
    </ListContainer>
  )

  const loader = <Loader key={0}>Loading ...</Loader>

  return (
    <Wrapper className='section section-center'>
      <h1>{headerTitle}</h1>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} loader={loader}>
        {items}
      </InfiniteScroll>
    </Wrapper>
  )
}

const Title = styled.div`
  margin-bottom: 3rem;
  .underline {
    width: 3rem;
    height: 5px;
    background: var(--clr-primary-5);
  }
`

const BookInfoContainer = styled.div`
  width: 280px;
  height: 280px;
  @media (min-width: 720px) {
    width: 400px;
  }
  @media (min-width: 1170px) {
    width: 240px;
  }
`

const ListItemContainer = styled.div`
  display: flex;
  gap: 2rem;
  flex-flow: row nowrap;
  margin-bottom: 6rem;
  font-size: 1rem;
  .img {
    width: 200px;
    height: 260px;
    background: grey;
    border-radius: var(--radius);
    box-shadow: var(--dark-shadow);
  }
`

const ReviewerInfo = styled.div`
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  svg {
    margin-right: 10px;
  }
  p {
    display: inline;
    font-size: 1.1rem;
    font-weight: 500;
    letter-spacing: var(--spacing);
    font-family: cursive;
  }
`

const ListItemWrapper = styled.div`
  margin: 0 auto;
`

const ListContainer = styled.section`
  display: flex;
  flex-direction: column;
  @media (min-width: 1170px) {
    align-items: center;
    justify-content: center;
    flex-flow: row wrap;
    column-gap: 3rem;
  }
`

const Wrapper = styled.div`
  h1 {
    color: var(--clr-grey-2);
    text-transform: capitalize;
    font-size: 2rem;
    margin-bottom: 6rem;
    font-family: cursive;
  }
`

const Loader = styled.div`
  text-align: center;
  font-size: 1.75rem;
  margin-top: 2rem;
  color: var(--clr-grey-5);
`

export default AllReviewList
