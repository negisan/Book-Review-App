import React from 'react'
import { Form, Field } from 'react-final-form'
import styled from 'styled-components'
import { IoPersonCircleOutline } from 'react-icons/io5'
import { useHistory } from 'react-router'

import { useAuthContext } from '../context/auth.context'
import { useUIContext } from '../context/UI.context'

interface FormData {
  email: string
  password: string
}

const Login: React.FC = () => {
  const { login } = useAuthContext()
  const { toastSuccess } = useUIContext()
  const history = useHistory()

  const onSubmit = async (values: FormData) => {
    await login(values)
    history.replace('/')
    toastSuccess('ログインしました')
  }

  const handleValidate = (values: FormData) => {
    // @ts-ignore
    const errors: FormData = {}
    if (!values.email) {
      errors.email = 'メールアドレスを入力してください'
    }
    if (!values.password) {
      errors.password = 'パスワードを入力してください'
    }
    return errors
  }

  return (
    <Wrapper>
      <FormCard>
        <img
          src='https://picsum.photos/450'
          alt='picsum'
          className='side-img'
        />

        <Form
          onSubmit={onSubmit}
          validate={(values) => handleValidate(values)}
          render={({ handleSubmit, submitting }) => (
            <FormWrapper onSubmit={handleSubmit}>
              <IoPersonCircleOutline size={80} />
              <FormContainer>
                <Field<string> name='email'>
                  {({ input, meta }) => (
                    <FieldContainer>
                      <input
                        {...input}
                        type='text'
                        placeholder='Email'
                        className={`${meta.error && meta.touched && 'error'}`}
                      />
                      {meta.error && meta.touched && (
                        <ErrorInfo>{meta.error}</ErrorInfo>
                      )}
                    </FieldContainer>
                  )}
                </Field>
                <Field<string> name='password'>
                  {({ input, meta }) => (
                    <FieldContainer>
                      <input
                        {...input}
                        type='text'
                        placeholder='Password'
                        className={`${meta.error && meta.touched && 'error'}`}
                      />
                      {meta.error && meta.touched && (
                        <ErrorInfo>{meta.error}</ErrorInfo>
                      )}
                    </FieldContainer>
                  )}
                </Field>
                <StyledButton type='submit' disabled={submitting}>
                  login
                </StyledButton>
              </FormContainer>
            </FormWrapper>
          )}
        />
      </FormCard>
    </Wrapper>
  )
}

const ErrorInfo = styled.span`
  margin-left: 1rem;
  color: var(--clr-red);
`

const StyledButton = styled.button`
  width: 100%;
  padding: 0.75rem 1.5rem;
  border-radius: 100px;
  text-transform: uppercase;
  letter-spacing: var(--spacing);
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--clr-white);
  margin-top: 2rem;
  border: none;
  background: var(--clr-primary-6);
  box-shadow: var(--light-shadow);
  cursor: pointer;
  transition: var(--transition);
  :hover {
    background: var(--clr-primary-5);
  }
`
const FieldContainer = styled.div`
  margin-bottom: 1.25rem;
  .error {
    border-color: var(--clr-red);
  }
  input {
    width: 100%;
    padding: 0.75rem 1.5rem;
    border: 1px solid var(--clr-grey-5);
    background: var(--clr-primary-9);
    border-radius: 100px;
    color: var(--clr-grey-5);
    font-size: 0.875rem;
    letter-spacing: var(--spacing);
    :-webkit-autofill {
      box-shadow: 0 0 0 1000px white inset;
    }
    :focus {
      outline: none;
    }
  }
  @media (min-width: 425px) {
    input {
      background: var(--clr-white);
    }
  }
`

const FormContainer = styled.div`
  width: 70%;
`

const FormWrapper = styled.form`
  padding: 6rem 0;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  gap: 3rem;
  svg {
    color: var(--clr-primary-6);
  }
`

const FormCard = styled.div`
  width: 100vw;
  .side-img {
    display: none;
  }
  @media (min-width: 425px) {
    box-shadow: var(--dark-shadow);
    border-radius: var(--radius);
    background: var(--clr-white);
    width: 425px;
  }
  @media (min-width: 1024px) {
    padding: 0;
    width: 760px;
    display: grid;
    grid-template-columns: 360px auto;
    .side-img {
      display: block;
      width: 360px;
      height: 100%;
      object-fit: cover;
    }
  } ;
`

const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export default Login
