import React from 'react'

export default function LogOut() {

  const logOut = () => {
    fetch('/logout')
  }

  return (
    <button onClick={logOut}>
      Log out
    </button>
  )
}
