import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import LogOut from '../parts/log-out'

import { Flex } from '../ui/general/flex'
import logoImg from '../assets/img/logo.png'
import { Button } from '../ui/general/button'

const HeaderWrapper = styled(Flex)`
  position: fixed;
  top: 0;
  max-width: 1000px;
  width: 100%;
  z-index: 100;
`

const Logo = styled(Flex)`
  width: 200px;
  padding: 5px 15px;
  background: black;
`

export default function Header({ state, logOutUser }) {
  return (
    <HeaderWrapper>
      <Flex justifyContent='space-between' width='100%' alignItems='center'>
        <Logo>
          <img src={logoImg} width='100%' alt="logo" />
        </Logo>
        {state.isLoggedIn ? (
          <Flex pr={20}>
            <p>hello, {state.user ? state.user.email : ""}</p>
            <LogOut logOutUser={logOutUser} />
          </Flex>
        ) : (
          <Flex pr={20}>
            <Link to='signup'>
              <Button>Sign up</Button>
            </Link>
          </Flex>
        )}
      </Flex>
    </HeaderWrapper>      
  )
}
