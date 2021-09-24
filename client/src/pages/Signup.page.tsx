import React from 'react'
import { Form, Field } from 'react-final-form'
import styled from 'styled-components'

import { useAuthContext } from '../context/auth.context'

import { IoPersonCircleOutline } from 'react-icons/io5'
import { useHistory } from 'react-router'
import { useUIContext } from '../context/UI.context'

interface FormData {
  name: string
  email: string
  password: string
  password_confirm: string
}

const Signup: React.FC = () => {
  const { register } = useAuthContext()
  const { emitToast } = useUIContext()
  const history = useHistory()

  const onSubmit = async (values: FormData) => {
    await register({
      name: values.name,
      email: values.email,
      password: values.password,
    })
    history.replace('/')
    emitToast('success', 'ユーザー登録に成功しました')
  }

  const handleValidate = (values: FormData) => {
    // @ts-ignore
    const errors: FormData = {}
    if (!values.name) {
      errors.name = '名前を入力してください'
    }
    if (!values.email) {
      errors.email = 'メールアドレスを入力してください'
    }
    if (!values.password) {
      errors.password = 'パスワードを入力してください'
    }
    if (!values.password_confirm) {
      errors.password_confirm = 'パスワードを入力してください'
    }
    if (values.password !== values.password_confirm) {
      errors.password_confirm = 'パスワードが一致しません'
    }
    return errors
  }

  return (
    <Wrapper>
      <FormCard>
        <img
          src='https://picsum.photos/500'
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
                <Field<string> name='name'>
                  {({ input, meta }) => (
                    <FieldContainer>
                      <input
                        {...input}
                        type='text'
                        placeholder='name'
                        className={`${meta.error && meta.touched && 'error'}`}
                      />
                      {meta.error && meta.touched && (
                        <ErrorInfo>{meta.error}</ErrorInfo>
                      )}
                    </FieldContainer>
                  )}
                </Field>
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
                <Field<string> name='password_confirm'>
                  {({ input, meta }) => (
                    <FieldContainer>
                      <input
                        {...input}
                        type='text'
                        placeholder='Password_confirm'
                        className={`${meta.error && meta.touched && 'error'}`}
                      />
                      {meta.error && meta.touched && (
                        <ErrorInfo>{meta.error}</ErrorInfo>
                      )}
                    </FieldContainer>
                  )}
                </Field>
                <StyledButton type='submit' disabled={submitting}>
                  signup
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
    mix-height: 70vh;
  }
  @media (min-width: 1024px) {
    padding: 0;
    width: 860px;
    display: grid;
    grid-template-columns: 400px auto;
    .side-img {
      display: block;
      width: 400px;
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

export default Signup
