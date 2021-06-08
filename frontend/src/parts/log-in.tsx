import React, { useState, useContext } from 'react'
import { Grid, FormControl, Button, Input, InputLabel, Box } from '@material-ui/core';
import { GlobalContext, tokenConfig } from '../contexts/global/GlobalState';
import { clearForm } from '../utils/helpers';

const FormControlStyled = ({ children, ...props }) => {
  return (
    <Box mb={3}>
      <FormControl {...props}>{children}</FormControl>
    </Box>
  )
}

export default function LogIn() {

  const { logInUser, logOutUser, user } = useContext(GlobalContext)

  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const formChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const submitForm = async (e) => {
    const loginConfig = {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
        // 'x-auth-token': localStorage.getItem('token'),
      },
    }
    try {
      e.preventDefault()
      const res = await fetch('/auth/login', loginConfig)
      const data = await res.json()
      console.log(data)
      if (data.id && data.token) { // tady jeste ten error handling nejak poresit
        logInUser(data)
        clearForm(form, setForm)
      }
    } catch (err) {
      console.log('login error: ', err)
    }
  }

  const logOutEvent = async () => {
    try {
      const res = await fetch('/auth/logout', tokenConfig())
      const data = await res.json()
      logOutUser()
    } catch (err) {
      console.log('logout FE error: ', err)
    }
  }

  return (
    <div>
      {!user.isAuthenticated ?
        (<form onSubmit={submitForm}>
          <Grid container direction='column'>
            <FormControlStyled>
              <InputLabel htmlFor="email">email: </InputLabel>
              <Input type="text" name="email" value={form.email} onChange={formChange} />
            </FormControlStyled>
            <FormControlStyled>
              <InputLabel htmlFor="email">password: </InputLabel>
              <Input type="password" name="password" value={form.password} onChange={formChange} />
            </FormControlStyled>
            <FormControlStyled>
              <Button type='submit' variant='contained' color='primary'>log in</Button>
            </FormControlStyled>
          </Grid>
        </form>) :
        <Button type='submit' variant='contained' color='secondary' onClick={logOutEvent}>log out</Button>
      }
    </div>

  )
}
