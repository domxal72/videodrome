import React, { useEffect } from 'react'
import Header from './parts/header';
import { Flex, FlexOut } from './ui/general/flex';
import Main from './parts/main'

function App() {

    useEffect(() => {
      fetch('/test')
      .then(response => response.json())
      .then(json => console.log(json))

      // fetch('https://jsonplaceholder.typicode.com/todos/1')
      // .then(response => response.json())
      // .then(json => console.log(json))
    });

  return (
    <Main>
      <Header />
      <Flex pt={100}>
        <video style={{height: '400px', width: '600px'}} id="videoPlayer" controls autoPlay={false}>
          <source src="http://localhost:5000/video" type="video/mp4" />
        </video>
      </Flex>
    </Main>
  );
}

export default App;
