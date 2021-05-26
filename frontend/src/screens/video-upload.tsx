import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { FormControl, Input, InputLabel, Button } from '@material-ui/core';
import { Flex } from '../ui/general/flex'

const ProgressBar = styled(Flex)`
  transition: width 0.2s;
`

export default function VideoUpload({infoMsg, setInfoMsg}) {

  const [files, setFile] = useState({
    videoThumb: null,
    videoFile: null,
  })
  const [inputs, setInputs] = useState({
    videoTitle: '',
    videoDescription: '',
  })

  const [uploadProgress, setUploadProgress] = useState({showProgress: false, percentage: 0})

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

  const clearForm = () => {
    setInputs({...inputs, videoTitle: '', videoDescription: '' })
    setFile({ ...files, videoThumb: null, videoFile: null })
  }

  const submitForm = async (e) => {
    e.preventDefault()

    const data = new FormData()
    await data.append('videoTitle', inputs.videoTitle)
    await data.append('videoDescription', inputs.videoDescription)
    await data.append('videoThumb', files.videoThumb)
    await data.append('videoFile', files.videoFile)

    console.log(data)

    axios({
      method: 'post',
      url: '/video/video-upload',
      data: data,
      onUploadProgress: progressEvent => {
        const percentage = Math.floor((progressEvent.loaded / progressEvent.total) * 100)
        setUploadProgress({ showProgress: true, percentage })
      }
    }).then( (response) => {
      setInfoMsg(response.data)
    })
    clearForm()
  }

  return (
    <div>
      <form onSubmit={submitForm} id='videoForm' encType="multipart/form-data">
        <Flex flexDirection='column'>
          <FormControl>
            <InputLabel>Video Title</InputLabel>
            <Input type="text" name="videoTitle" id="videoTitle" placeholder='Title' onChange={inputChange} />
          </FormControl>
          <FormControl>
            <InputLabel>Video Description</InputLabel>
            <Input type="text" name="videoDescription" id="videoDescription" placeholder='Description' onChange={inputChange} />
          </FormControl>
          {/* <Button
            variant="contained"
            component="label"
          >
            Choose video
            <input
              type="file"
              name="videoFile"
              id="videoFile"
              accept="image/png, image/jpeg"
              onChange={videoThumbSelect}
              hidden
            />
          </Button>
          <Button
            variant="contained"
            component="label"
          >
            Choose image
            <input
              type="file"
              name="videoThumb"
              id="videoThumb"
              accept='video/mp4'
              onChange={videoFileSelect}
              hidden
            />
          </Button> */}
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
          {/* <button type="submit">Upload file</button> */}
          <Button type="submit" color='primary' variant='contained'>Upload file</Button>
        </Flex>
      </form>
      {uploadProgress.showProgress && (
        <Flex width={300} height={50}>
          <ProgressBar width={`${uploadProgress.percentage}%`} height='100%' bg='teal'></ProgressBar>
          <div>{`${uploadProgress.percentage}%`}</div>
        </Flex>
      )}
      {infoMsg && (
        <div>{infoMsg}</div>
      )}
    </div>
  )
}
