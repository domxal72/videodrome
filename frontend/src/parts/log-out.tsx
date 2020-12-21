import React from 'react'
import { Button } from '../ui/general/button'

export default function LogOut({ logOutUser }) {

  // Async/await based function
  const logOut = async () => {
    const response = await fetch('/auth/logout')
    const data = await response.json()
    console.log(data)
    if (data.user) {
      logOutUser()
    }
    if (data.errors){
      console.log('error: ', data)
    }
  }

  return (
    <Button onClick={logOut}>
      Log out
    </Button>
  )
}
