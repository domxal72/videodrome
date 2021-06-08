import React from 'react'

const fetchData = async (url) => {
  try {
    const response = await fetch(url)
    let contentType = response.headers.get("Content-Type")
    let types = {
      json: 'application/json',
      text: 'text/html',
    }
    let data
    if (contentType.includes(types.json)){
      // console.log(await response.json())
      data = await response.json()
    }
    if (contentType.includes(types.text)){
      // console.log(await response.text())
      data = await response.text()
    }
    await console.log(response)
    return data
  } catch (error) {
    console.log(error)
  }
}

export default function Fetch() {

//  const url = 'https://jsonplaceholder.typicode.com/posts'
 const url = '/video/fetch-test'

  return (
    <div>
      <button onClick={() => {fetchData(url)}}>fetch data</button>
    </div>
  )
}
