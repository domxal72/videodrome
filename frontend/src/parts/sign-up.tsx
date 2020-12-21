import React, { useState } from 'react'

export default function SignUp({logInUser}) {

  const [form, setForm] = useState({
    email: '',
    password: '',
    passwordRepeat: '',
  })
  
  const formChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value })
  }

  const submitForm = async (e) => {
    e.preventDefault()
    if (form.password === form.passwordRepeat) {
      const res = await fetch('/auth/signup', {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      const data = await res.json()
      if (data.userID) {
        logInUser(data)
      }
      if (data.errors){
        window.location.assign('/denied')
        // window.location.assign('/homepage')
      }
    } else {
      console.log('password not match')
    }
  }

  return (
    <form onSubmit={submitForm}>
      <div>
        <label htmlFor="email">email: </label>
        <input type="text" name="email" onChange={formChange} />
      </div>
      <div>
        <label htmlFor="email">password: </label>
        <input type="password" name="password" onChange={formChange} />
      </div>
      <div>
        <label htmlFor="email">password repeat: </label>
        <input type="password" name="passwordRepeat" onChange={formChange} />
      </div>
      <div>
        <button>Sign up</button>
      </div>
    </form>
  )
}
