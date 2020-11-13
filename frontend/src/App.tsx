import React, { useEffect, useState } from 'react'
import Header from './parts/header';
import { Flex, FlexOut } from './ui/general/flex';
import Main from './parts/main'

function App() {

    const [form, setForm] = useState({
      email: '',
      password: '',
    })

    // useEffect(() => {
    //   fetch('/test')
    //   .then(response => response.json())
    //   .then(json => console.log(json))

    //   // fetch('https://jsonplaceholder.typicode.com/todos/1')
    //   // .then(response => response.json())
    //   // .then(json => console.log(json))
    // });

    const formChange = (e) => {
      console.log(form)
      setForm({...form, [e.target.name]: e.target.value })
    }

    const submitForm = (e) => {
      e.preventDefault()
      console.log(form)
    }

  return (
    <Main>
      <Header />
      <Flex pt={100} flexDirection='column'>
        <form onSubmit={submitForm}>
          <label htmlFor="email">email</label>
          <input type="text" name="email" onChange={formChange} />
          <label htmlFor="email">password</label>
          <input type="password" name="password" onChange={formChange} />
          <button>sign up</button>
        </form>
        <video style={{height: '400px', width: '600px'}} id="videoPlayer" controls autoPlay={false}>
          <source src="http://localhost:5000/video" type="video/mp4" />
        </video>
      </Flex>
    </Main>
  );
}

export default App;
