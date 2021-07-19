import React, { useContext } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { Flex } from '../ui/general/flex'
import { sizes } from '../ui/layout/sizes'
import logoImg from '../assets/img/logo.png'
import { Button } from '@material-ui/core'
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

  return (
    <HeaderWrapper>
      <Flex justifyContent='space-between' width='100%' alignItems='center'>
        <Link to='/'>
          <Logo>
            <img src={logoImg} width='100%' alt="logo" />
          </Logo>
        </Link>
        <Flex>
          <Link to='/signup'>
            <Button variant='contained'>Sign up</Button>
          </Link>
          <Link to='/home'>
            <Button variant='contained'>Log in</Button>
          </Link>
        </Flex>
      </Flex>
    </HeaderWrapper>
  )
}
