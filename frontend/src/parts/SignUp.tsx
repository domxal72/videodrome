import React, { useState, useContext } from 'react'
import { GlobalContext } from '../contexts/global/GlobalState';
import { clearForm } from '../utils/helpers'

export default function SignUp() {

  const { logInUser } = useContext(GlobalContext)

  const [form, setForm] = useState({
    email: '',
    password: '',
    passwordRepeat: '',
  })

  const { email, password, passwordRepeat } = form

  const formChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const submitForm = async (e) => {
    e.preventDefault()
    if (password === passwordRepeat) {
      const res = await fetch('/auth/signup', {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      const data = await res.json()
      logInUser(data)
      clearForm(form, setForm)
      if (data.errors) {
        window.location.assign('/denied') // tohle asi taky vyhodit a nahradit kdyztak react routerem
        // window.location.assign('/homepage')
      }
    } else {
      console.log('password not match')
    }
  }

  return (
    <div>
      <form onSubmit={submitForm}>
        <div>
          <label htmlFor="email">email: </label>
          <input type="text" name="email" value={email} onChange={formChange} />
        </div>
        <div>
          <label htmlFor="email">password: </label>
          <input type="password" name="password" value={password} onChange={formChange} />
        </div>
        <div>
          <label htmlFor="email">password repeat: </label>
          <input type="password" name="passwordRepeat" value={passwordRepeat} onChange={formChange} />
        </div>
        <div>
          <button type='submit'>Sign up</button>
        </div>
      </form>
    </div>
  )
}
