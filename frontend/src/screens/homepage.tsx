import React from 'react'
import { Typography } from '@material-ui/core';
import LogIn from '../parts/log-in'
import { Flex } from '../ui/general/flex'

export default function Homepage() {
  return (
    <Flex flexDirection='column'>
      <Typography>
        Greetings and Salutation <br />
        This is Videodrome <br />
        To proceed to dashboard, just log in <br />
        or sign up if you dont have an account.
      </Typography>
      <LogIn />
    </Flex>
  )
}
