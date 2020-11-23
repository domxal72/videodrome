import React, { useState } from 'react'

export default function SignUp() {

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
    fetch('/auth/signup', {
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
        if (data.errors){
          window.location.assign('/denied')
        }
      })
  }

  return (
    <form onSubmit={submitForm}>
      <label htmlFor="email">email</label>
      <input type="text" name="email" onChange={formChange} />
      <label htmlFor="email">password</label>
      <input type="password" name="password" onChange={formChange} />
      <button>sign up</button>
    </form>
  )
}
