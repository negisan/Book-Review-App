import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { useAuthContext } from '../context/auth.context'

const Navbar = () => {
  const { logout } = useAuthContext()

  return (
    <Wrapper>
      <h1>Navbar</h1>
      <Links>
        <Link to='/'>Home</Link>
        <Link to='/login'>Login</Link>
        <Link to='/signup'>Signup</Link>
        <button onClick={() => logout()}>Logout</button>
      </Links>
    </Wrapper>
  )
}

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3rem;
  padding: 0.25rem 1.5rem;
  border-bottom: 1px solid black;
`
const Links = styled.div`
  a {
    margin-right: 0.5rem;
    color: var(--clr-grey-3);
  }
  button {
    border: transparent;
    background: transparent;
    color: var(--clr-grey-3);
  }
`

export default Navbar
