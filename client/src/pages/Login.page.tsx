import React from 'react'
import { Form, Field } from 'react-final-form'
import styled from 'styled-components'
import { IoPersonCircleOutline } from 'react-icons/io5'

interface FormData {
  email: string
  password: string
}

const Login: React.FC = () => {
  const onSubmit = async (values: FormData) => {
    console.log(values)
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
          render={({ handleSubmit, submitting }) => (
            <FormWrapper onSubmit={handleSubmit}>
              <IoPersonCircleOutline size={80} />
              <FormContainer>
                <Field<string> name='email'>
                  {({ input, meta }) => (
                    <FieldContainer>
                      <input {...input} type='text' placeholder='Email' />
                      <div>
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    </FieldContainer>
                  )}
                </Field>
                <Field<string> name='password'>
                  {({ input, meta }) => (
                    <FieldContainer>
                      <input {...input} type='text' placeholder='Password' />
                      <div>
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
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
  input {
    width: 100%;
    padding: 0.75rem 1.5rem;
    border: 1px solid var(--clr-grey-5);
    background: var(--clr-primary-9);
    border-radius: 100px;
    color: var(--clr-grey-5);
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
