import React, { useState } from 'react'
import { Grid, FormControl, Button, Input, InputLabel } from '@material-ui/core';

export default function LogIn({ logInUser }) {
  
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  
  const formChange = (e) => {
    // console.log(form)
    setForm({...form, [e.target.name]: e.target.value })
  }

  const submitForm = (e) => {
    e.preventDefault()
    console.log(form)
    fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    // tady to handlovani s tim then neni uplne dobry, bud prepsat na async/await nebo to proste spravit
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.userID) {
          logInUser(data)
        }
        if (data.errors){
          console.log('error: ', data)
        }
      })
  }

  return (
    <form onSubmit={submitForm}>
      <Grid container direction='column'>
        <FormControl>
          <InputLabel htmlFor="email">email: </InputLabel>
          <Input type="text" name="email" onChange={formChange} />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="email">password: </InputLabel>
          <Input type="password" name="password" onChange={formChange} />
        </FormControl>
        <FormControl>
          <Button type='submit' variant='contained' color='primary'>log in</Button>
        </FormControl>
      </Grid>
    </form>
  )
}
