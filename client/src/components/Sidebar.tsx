import React, { useEffect } from 'react'
import styled from 'styled-components'
import { FaTimes } from 'react-icons/fa'
import { GiBookAura } from 'react-icons/gi'
import { Link } from 'react-router-dom'

import { useUIContext } from '../context/UI.context'
import { useAuthContext } from '../context/auth.context'

const Sidebar: React.FC = () => {
  const { isSidebarOpen, closeSidebar } = useUIContext()
  const { logout, user } = useAuthContext()

  const logoutWithSidebarClose = () => {
    logout()
    closeSidebar()
  }

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

  return (
    <Wrapper>
      <div className={`${isSidebarOpen ? 'sidebar show-sidebar' : 'sidebar'}`}>
        <Header>
          <Link to='/' className='logo'>
            <GiBookAura size={50} />
          </Link>
          <button className='close-btn' type='button' onClick={closeSidebar}>
            <FaTimes size={40} />
          </button>
        </Header>
        <Links>
          {user ? (
            <>
              <li>
                <Link to={`/user/${user.name}`} onClick={closeSidebar}>
                  Profile
                </Link>
              </li>
              <li>
                <Link to='/reviews/new' onClick={closeSidebar}>
                  CreateReview
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to='/login' onClick={closeSidebar}>
                  Login
                </Link>
              </li>
              <li>
                <Link to='/signup' onClick={closeSidebar}>
                  Signup
                </Link>
              </li>
            </>
          )}
        </Links>
        {user && (
          <LogoutButton onClick={() => logoutWithSidebarClose()}>
            Logout
          </LogoutButton>
        )}
      </div>
    </Wrapper>
  )
}

const LogoutButton = styled.button`
  background: transparent;
  border: transparent;
  cursor: pointer;
  font-size: 2.5rem;
  color: var(--clr-primary-5);
  letter-spacing: var(--spacing);
`

const Links = styled.ul`
  margin-top: 6rem;
  margin-bottom: 6rem;
  li {
    margin-bottom: 2.5rem;
  }
  a {
    font-size: 2.5rem;
    color: var(--clr-primary-5);
    letter-spacing: var(--spacing);
    transition: var(--transition);
    &:hover {
      padding-left: 0.5rem;
    }
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.75rem 3rem;
  .logo {
    color: var(--clr-primary-5);
  }
  .close-btn {
    background: transparent;
    border: transparent;
    color: var(--clr-primary-5);
  }
  .close-btn:hover {
    cursor: pointer;
  }
`

const Wrapper = styled.aside`
  text-align: center;
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--clr-black);
    transform: translate(-100%);
    transition: var(--transition);
    z-index: -1;
  }
  .show-sidebar {
    transform: translate(0);
    z-index: 999;
  }
`

export default Sidebar
