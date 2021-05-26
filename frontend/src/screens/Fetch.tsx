import React, { useEffect} from 'react'

const fetchData = async (url) => {
  try {
    const response = await fetch(url)
    let contentType = response.headers.get("Content-Type")
    // console.log(response.headers.get("Content-Type"))
    let types = {
      json: 'application/json',
      text: 'text/html',
    }

    if (contentType.includes(types.json)){
      console.log(await response.json())
    }
    if (contentType.includes(types.text)){
      console.log(await response.text())
    }
    // switch (contentType) {
    //   case types.text:
    //     await console.log(response.text())
    //     break;
    //   case types.json:
    //     await console.log(response.json())
    //     break;
    
    //   default:
    //     await console.log(response.json())
    //     break;
    // }
    // const data = await response.json()
  
    await console.log(response)
    // await console.log(response.blob)
    // await console.log(response.headers.get("Content-Type"))
    // await console.log(data)

    // return data
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
