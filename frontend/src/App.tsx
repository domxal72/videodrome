import React, { useEffect } from 'react'
import { Flex, FlexOut } from './ui/general/flex';
import Grid from './ui/grid/grid';
import Main from './ui/main'

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
      <Grid />
      <Flex width={150} height={300} bg='red' />
      <FlexOut width={150} height={300} bg='red' />
    </Main>
  );
}

export default App;
