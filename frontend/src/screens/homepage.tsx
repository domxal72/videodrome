import React from 'react'
import LogIn from '../parts/log-in'
import { Flex } from '../ui/general/flex'

export default function Homepage({ logInUser }) {
  return (
    <Flex flexDirection='column'>
      <p>
        Greetings and Salutation <br />
        This is Videodrome <br />
        To proceed to dashboard, just log in <br />
        or sign up if you dont have an account.
      </p>
        <LogIn logInUser={logInUser} />
    </Flex>
  )
}
