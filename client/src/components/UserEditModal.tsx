import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Field, Form } from 'react-final-form'
import { FaTimes } from 'react-icons/fa'

import { useAuthContext } from '../context/auth.context'

const UserEditModal = ({ closeUserEditModal }: any) => {
  const { user, updateUser } = useAuthContext()

  const disableScroll = (event: any) => {
    event.preventDefault()
  }
  useEffect(() => {
    document.addEventListener('touchmove', disableScroll, {
      passive: false,
    })
    document.addEventListener('mousewheel', disableScroll, {
      passive: false,
    })
    return () => {
      document.removeEventListener('touchmove', disableScroll)
      document.removeEventListener('mousewheel', disableScroll)
    }
  }, [])

  const onSubmit = async (values: any) => {
    await updateUser(values)
  }

  const handleValidate = (values: any) => {
    const errors: any = {}
    if (!values.name) {
      errors.name = '名前を入力してください'
    }

    return errors
  }

  let formData = {
    name: user.name,
  }

  return (
    <Wrapper>
      <div className='overlay'>
        <ModalWrapper>
          <Header>
            <button
              className='close-btn'
              type='button'
              onClick={closeUserEditModal}
            >
              <FaTimes size={40} />
            </button>
          </Header>
          <Title>ユーザー情報の変更</Title>
          <Form
            onSubmit={onSubmit}
            validate={(values) => handleValidate(values)}
            initialValues={formData}
            render={({ handleSubmit, submitting, pristine }) => (
              <form onSubmit={handleSubmit}>
                <div>
                  <Field<string> name='name'>
                    {({ input, meta }) => (
                      <FieldContainer>
                        {meta.error && meta.touched && (
                          <ErrorInfo>{meta.error}</ErrorInfo>
                        )}
                        <input
                          {...input}
                          type='text'
                          placeholder='UserName'
                          className={`${meta.error && meta.touched && 'error'}`}
                        />
                      </FieldContainer>
                    )}
                  </Field>
                  <ButtonContainer>
                    <button
                      type='submit'
                      className='btn'
                      disabled={submitting || pristine}
                    >
                      submit
                    </button>
                  </ButtonContainer>
                </div>
              </form>
            )}
          />
        </ModalWrapper>
      </div>
    </Wrapper>
  )
}

const Title = styled.h1`
  color: var(--clr-grey-3);
  font-seze: 1.5rem;
  margin-bottom: 3rem;
  text-align: center;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`
const ErrorInfo = styled.span`
  margin-left: 1.25rem;
  color: var(--clr-red);
  align-self: start;
`

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
  input {
    width: 50vw;
    max-width: 680px;
    min-width: 360px;
    height: 3rem;
    padding: 1rem 1.5rem;
    border: 1px solid var(--clr-grey-7);
    background: var(--clr-white);
    border-radius: var(--radius);
    color: var(--clr-grey-5);
    font-size: 1rem;
    letter-spacing: var(--spacing);
    :-webkit-autofill {
      box-shadow: 0 0 0 1000px white inset;
    }
    :focus {
      outline: none;
    }
  }
  .error {
    border-color: var(--clr-red);
  }
`

const Header = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 2rem;
  .close-btn {
    cursor: pointer;
    background: transparent;
    border: transparent;
  }
`

const ModalWrapper = styled.div`
  z-index: 21;
  width: 55vw;
  max-width: 760px;
  min-width: 425px;
  padding: 1.5em;
  background: var(--clr-white);
  border-radius: var(--radius);
`

const Wrapper = styled.div`
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export default UserEditModal
