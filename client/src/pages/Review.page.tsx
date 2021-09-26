import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { IoPersonCircleOutline } from 'react-icons/io5'
import { GoLinkExternal } from 'react-icons/go'
import { BsThreeDots } from 'react-icons/bs'
import { confirmAlert } from 'react-confirm-alert'

import { CustomLoader } from '../components'

import { useReviewsContext } from '../context/reviews.context'

const Review = () => {
  const {
    fetchReview,
    review: items,
    isLoading,
    deleteReview,
  } = useReviewsContext()
  // @ts-ignore
  const { id } = useParams()
  const { title, url, detail, review, reviewer, isMine } = items
  const [isEditMenueOpen, setIsEditMenueOpen] = useState(false)

  function isValidHttpUrl(string: string) {
    let url
    try {
      url = new URL(string)
    } catch (_) {
      return false
    }
    return url.protocol === 'http:' || url.protocol === 'https:'
  }

  const validURL = isValidHttpUrl(url)

  const handleDeleteOnClick = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <AlertContainer>
            <h1>本当に削除してもよろしいですか？</h1>
            <div className='btn-container'>
              <button
                onClick={() => {
                  deleteReview(id)
                  onClose()
                }}
                className='btn-yes'
              >
                はい
              </button>
              <button onClick={onClose} className='btn-no'>
                いいえ
              </button>
            </div>
          </AlertContainer>
        )
      },
    })
  }

  const closeEditMenue = () => {
    setIsEditMenueOpen(false)
  }
  const openEditMenue = (e: any) => {
    e.stopPropagation()
    setIsEditMenueOpen(true)
  }

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
          {isMine ? (
            <EditMenue>
              <BsThreeDots
                size={45}
                className='menue-icon'
                onClick={(e) => openEditMenue(e)}
              />
              {isEditMenueOpen && (
                <>
                  <div className='overlay' onClick={closeEditMenue}></div>
                  <EditBar>
                    <Link to={`/review/${id}/edit`} className='item'>
                      <p>編集する</p>
                    </Link>
                    <div
                      className='item delete'
                      onClick={() => handleDeleteOnClick()}
                    >
                      <p>削除する</p>
                    </div>
                  </EditBar>
                </>
              )}
            </EditMenue>
          ) : (
            ''
          )}
          <ReviewerInfo>
            <IoPersonCircleOutline size={24} />
            <p>{reviewer}</p>
          </ReviewerInfo>
          <h1 className='title'>{title}</h1>
          <div className='underline'></div>
        </Heading>
        <BookInfoContainer>
          <div className='img-wrap'>
            <img src='https://picsum.photos/200/260' alt='picsum' />
          </div>
          <div>
            <Title>
              <div>
                <h4>{title}</h4>
                {validURL && (
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

const AlertContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  min-width: 400px;
  background: var(--clr-white);
  box-shadow: var(--dark-shadow);
  border-radius: var(--radius);
  padding: 6rem 3rem 3rem 3rem;
  display: flex;
  gap: 6rem;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  text-align: center;
  h1 {
    color: var(--clr-grey-3);
  }
  button {
    background: transparent;
    border: transparent;
    border-radius: var(--radius);
    font-size: 1.75rem;
    padding: 0.5rem 1.5rem;
    box-shadow: var(--light-shadow);
    cursor: pointer;
    transition: var(--transition);
  }
  .btn-yes {
    margin-right: 4rem;
    background: var(--clr-red);
    color: var(--clr-white);
  }
  .btn-no {
    background: var(--clr-grey-6);
    color: var(--clr-white);
  }
`

const EditMenue = styled.div`
  display: flex;
  justify-content: end;
  .menue-icon {
    color: var(--clr-grey-4);
    cursor: pointer;
  }
  position: relative;
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    background: transparent;
    width: 100vw;
    height: 100vh;
    z-index: 2;
  }
`

const EditBar = styled.div`
  position: absolute;
  z-index: 10;
  display: flex;
  flex-direction: column;
  background: var(--clr-white);
  border-radius: var(--radius);
  box-shadow: var(--light-shadow);
  .item {
    transition: var(--transition);
    padding: 1rem 1.75rem;
    :hover {
      background: var(--clr-grey-10);
    }
  }
  p {
    display: inline;
    font-size: 1.25rem;
    color: var(--clr-grey-5);
    font-weight: 600;
    line-height: 1.2;
  }
  .delete {
    cursor: pointer;
    p {
      color: var(--clr-red);
    }
  }
`

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
    text-transform: capitalize;
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
  .img-wrap {
    width: 200px;
    height: 260px;
    background: grey;
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
  border: 1px solid var(--clr-grey-3);
  border-radius: var(--radius);
  padding: 3rem;
`

export default Review
