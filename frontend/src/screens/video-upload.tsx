import React, { useState } from 'react'
import { Flex } from '../ui/general/flex'

export default function VideoUpload() {

  const [files, setFile] = useState({
    videoThumb: null,
    videoFile: null,
  })
  const [inputs, setInputs] = useState({
    videoTitle: '',
    videoDescription: '',
  })

  const videoThumbSelect = (e) => {
    setFile({ ...files, videoThumb: e.target.files[0] })
    console.log(e.target.files)
  }

  const videoFileSelect = (e) => {
    setFile({ ...files, videoFile: e.target.files[0] })
    console.log(e.target.files)
  }

  const inputChange = e => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
  }

  const submitForm = async (e) => {
    e.preventDefault()

    const data = new FormData()
    await data.append('videoTitle', inputs.videoTitle)
    await data.append('videoDescription', inputs.videoDescription)
    await data.append('videoThumb', files.videoThumb)
    await data.append('videoFile', files.videoFile)

    console.log(data)

    const response = await fetch('/video-upload', {
      method: 'POST',

      // WARNING: nedavat tam header jinak to nepude, more info: https://muffinman.io/blog/uploading-files-using-fetch-multipart-form-data/
      // headers: {
      //   'Content-Type': 'multipart/form-data'
      //   // 'Content-Type': 'application/json'
      // },
      body: data,
    })

  console.log(response)
  }

  return (
    <div>
      <form onSubmit={submitForm} id='videoForm' encType="multipart/form-data">
        <Flex flexDirection='column'>
          {/* <input type="file" name="videoFile" id="videoFile" accept='video/mp4' onChange={fileSelect} multiple /> */}
          <input type="text" name="videoTitle" id="videoTitle" onChange={inputChange} />
          <input type="text" name="videoDescription" id="videoDescription" onChange={inputChange} />
          <input
            type="file"
            name="videoFile"
            id="videoFile"
            accept="image/png, image/jpeg"
            onChange={videoThumbSelect}
          />
          <input
            type="file"
            name="videoThumb"
            id="videoThumb"
            accept='video/mp4'
            onChange={videoFileSelect}
          />
          {/* <input type="file" name="videoFile" id="videoFile" accept='image/jpeg' onChange={fileSelect} /> */}
          {/* <label htmlFor="videoFile">vyber</label> */}
          <button type="submit">Upload file</button>
        </Flex>
      </form>
    </div>
  )
}
