import React from 'react'

function App() {

  fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())
    .then(json => console.log(json))

  return (
    <div className="App">
      co je
    </div>
  );
}

export default App;
