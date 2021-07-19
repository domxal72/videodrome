import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { GlobalContext } from '../contexts/global/GlobalState'

export default function ProtectedRoute({ children, ...props }) {

  const { user } = useContext(GlobalContext)

  if (user.token) {
    return (
      <Route {...props}>
        {children}
      </Route>
    )
  } else {
    return (
      <Redirect to='/not-authorized' />
    )
  }
}
