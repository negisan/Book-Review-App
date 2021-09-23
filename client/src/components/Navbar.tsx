import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { GiBookAura } from 'react-icons/gi'
import { BiUser } from 'react-icons/bi'

import { useUIContext } from '../context/UI.context'

const Navbar: React.FC = () => {
  const { openSidebar } = useUIContext()

  return (
    <Wrapper>
      <LogoContainer>
        <Link to='/'>
          <GiBookAura size={50} />
        </Link>
      </LogoContainer>
      <UserIconContainer>
        <BiUser size={26} onClick={openSidebar} />
      </UserIconContainer>
    </Wrapper>
  )
}

const UserIconContainer = styled.div`
  margin-right: 1.75rem;
  cursor: pointer;
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
