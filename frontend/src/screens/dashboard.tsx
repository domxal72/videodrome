import React, { useEffect } from 'react'
import { Flex } from '../ui/general/flex'

export default function Dashboard({ state, getVideoList }) {

  useEffect(() => {
    getVideoList()
  }, [])

  return (
    <Flex flexDirection='column'>
      {/* TODO */}
      <ul style={{display: 'flex' }}>
        {state.videos.map(({ _id, title, description, img }) => (
          <li key={_id}>
            <p>{title}</p>
            <p>{description}</p>
            <img src={img} alt="alt img txt" />
          </li>
        ))}
      </ul>
      <video style={{height: '400px', width: '600px'}} id="videoPlayer" controls autoPlay={false}>
        <source src="http://localhost:5000/video" type="video/mp4" />
      </video>
    </Flex>
  )
}
