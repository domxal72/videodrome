import React, { useState } from 'react'

export default function LogIn() {
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
        if (data.errors){
          console.log('error: ', data)
        }
      })
  }

  return (
    <form onSubmit={submitForm}>
      <label htmlFor="email">email</label>
      <input type="text" name="email" onChange={formChange} />
      <label htmlFor="email">password</label>
      <input type="password" name="password" onChange={formChange} />
      <button>log in</button>
    </form>
  )
}
