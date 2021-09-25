import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { GiBookAura } from 'react-icons/gi'
import { BiUser } from 'react-icons/bi'

import { useUIContext } from '../context/UI.context'
import { useAuthContext } from '../context/auth.context'

const Navbar: React.FC = () => {
  const { openSidebar } = useUIContext()
  const { user } = useAuthContext()

  return (
    <Wrapper>
      <LogoContainer>
        <Link to='/'>
          <GiBookAura size={50} />
        </Link>
      </LogoContainer>
      <UserIconContainer onClick={openSidebar}>
        <BiUser size={26} />
        <span>{user?.name}</span>
      </UserIconContainer>
    </Wrapper>
  )
}

const UserIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1.75rem;
  cursor: pointer;
  span {
    font-size: 1.25rem;
    color: var(--clr-grey-3);
    letter-spacing: var(--spacing);
    margin-left: 10px;
    font-family: cursive;
  }
`

const LogoContainer = styled.div`
  a {
    color: var(--clr-grey-3);
  }
`

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 6rem;
  padding: 0.25rem 1.75rem;
  background: var(--clr-primary-9);
`

export default Navbar
