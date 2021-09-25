import React, { useEffect } from 'react'
import { Form, Field } from 'react-final-form'
import { useParams } from 'react-router'
import styled from 'styled-components'

import { CustomLoader } from '.'

import { useReviewsContext } from '../context/reviews.context'

interface FormData {
  title: string
  url: string
  detail: string
  review: string
}

const ReviewForm = (props?: any) => {
  const from = props.from
  const { fetchReview, createReview, updateTeview, review, isLoading } =
    useReviewsContext()
  // @ts-ignore
  const { id } = useParams()

  const onSubmit = async (values: FormData) => {
    if (from === 'edit_page') {
      await updateTeview(id, values)
    }
    if (from === 'create_page') {
      await createReview(values)
    }
  }

  const handleValidate = (values: FormData) => {
    // @ts-ignore
    const errors: FormData = {}
    if (!values.title) {
      errors.title = 'required'
    }
    if (!values.url) {
      errors.url = 'required'
    }
    if (!values.detail) {
      errors.detail = 'required'
    }
    if (!values.review) {
      errors.review = 'required'
    }
    return errors
  }

  // EditPageにURL指定で直接アクセスしてきたとき、又はリロードしたときのために必要
  useEffect(() => {
    if (from === 'edit_page' && review === '') {
      fetchReview(id)
    }
  }, [])

  let formData: FormData = {
    title: '',
    url: '',
    detail: '',
    review: '',
  }

  if (from === 'edit_page') {
    formData = {
      title: review.title,
      url: review.url,
      detail: review.detail,
      review: review.review,
    }
  }

  if (isLoading) {
    return <CustomLoader />
  }

  return (
    <div>
      <Form
        onSubmit={onSubmit}
        validate={(values) => handleValidate(values)}
        initialValues={formData}
        render={({ handleSubmit, submitting, pristine }) => (
          <FormWrapper onSubmit={handleSubmit}>
            <Field<string> name='title'>
              {({ input, meta }) => (
                <FieldContainer>
                  <span className='required'>必須</span>
                  <input
                    {...input}
                    type='text'
                    placeholder='本の名前'
                    className={`${meta.error && meta.touched && 'error'}`}
                  />
                </FieldContainer>
              )}
            </Field>
            <Field<string> name='url'>
              {({ input, meta }) => (
                <FieldContainer>
                  <span className='required'>必須</span>
                  <input
                    {...input}
                    type='text'
                    placeholder='URL'
                    className={`${meta.error && meta.touched && 'error'}`}
                  />
                </FieldContainer>
              )}
            </Field>
            <Field<string> name='detail'>
              {({ input, meta }) => (
                <FieldContainer>
                  <span className='required'>必須</span>
                  <textarea
                    {...input}
                    placeholder='本の詳細'
                    rows={3}
                    className={`${meta.error && meta.touched && 'error'}`}
                  />
                </FieldContainer>
              )}
            </Field>
            <Field<string> name='review'>
              {({ input, meta }) => (
                <FieldContainer>
                  <span className='required'>必須</span>
                  <textarea
                    {...input}
                    placeholder='レビュー'
                    rows={15}
                    className={`${meta.error && meta.touched && 'error'}`}
                  />
                </FieldContainer>
              )}
            </Field>
            <ButtonWrapper>
              <button
                type='submit'
                className='btn'
                disabled={submitting || pristine}
              >
                投稿する
              </button>
            </ButtonWrapper>
          </FormWrapper>
        )}
      />
    </div>
  )
}

const ButtonWrapper = styled.div`
  margin-top: 6rem;
  display: flex;
  justify-content: center;
  width: 100%;
`

const FieldContainer = styled.div`
  position: relative;
  margin-bottom: 0.75rem;
  .required {
    position: absolute;
    left: -3rem;
    top: 3px;
    padding: 1px 5px;
    background: var(--clr-red);
    border-radius: var(--radius);
    color: var(--clr-white);
  }
  input,
  textarea {
    width: 100%;
    font-family: Meiryo UI;
    font-weight: 600;
    font-size: 1rem;
    color: var(--clr-grey-5);
    font-color: var(--clr-grey-5);
    letter-spacing: var(--spacing);
    line-height: 1.2;
    padding: 20px 45px;
    background: var(--clr-white);
    border: 1px solid var(--clr-grey-9);
    border-radius: var(--radius);
    :-webkit-autofill {
      box-shadow: 0 0 0 1000px white inset;
    }
    :focus {
      outline: none;
    }
    ::placeholder {
      color: var(--clr-grey-8);
    }
  }
  .error {
    border: 2px solid var(--clr-red);
  }
`

const FormWrapper = styled.form`
  margin: 0 auto;
  padding: 5rem 0;
  width: 75vw;
  max-width: 760px;
`

export default ReviewForm
