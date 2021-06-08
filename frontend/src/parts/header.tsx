import React, { useContext } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { Flex } from '../ui/general/flex'
import { sizes } from '../ui/layout/sizes'
import logoImg from '../assets/img/logo.png'
import { Button } from '@material-ui/core'
import Fetch from '../screens/Fetch'
import { GlobalContext, tokenConfig } from '../contexts/global/GlobalState'

const HeaderWrapper = styled(Flex)`
  position: fixed;
  top: 0;
  max-width: ${sizes.pageWidth};
  width: 100%;
  z-index: 100;
`

const Logo = styled(Flex)`
  width: 200px;
  padding: 5px 15px;
  background: black;
`

export default function Header() {

  const checkUser = async () => {
    tokenConfig.method = 'POST'
    tokenConfig.headers['Content-Type'] = 'text/plain'
    const res = await fetch('/protected', tokenConfig)
    const data = await res.text()
    console.log(data)
  }

  return (
    <HeaderWrapper>
      <Flex justifyContent='space-between' width='100%' alignItems='center'>
        <Link to='/'>
          <Logo>
            <img src={logoImg} width='100%' alt="logo" />
          </Logo>
          <button onClick={checkUser}>check user</button>
        </Link>
        <Fetch />
        {/* {state.isLoggedIn ? (
          <Flex>
            <p>hello, {state.user ? state.user.email : ""}</p>
          </Flex>
        ) : ( */}
        <Flex>
          <Link to='/signup'>
            <Button>Sign up</Button>
          </Link>
        </Flex>
        {/* )} */}
      </Flex>
    </HeaderWrapper>
  )
}
