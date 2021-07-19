import React from 'react'

export default function VideoContainer({ src }) {
  return (
    <video style={{ height: '400px', width: '600px' }} id="videoPlayer" controls autoPlay={false}>
      <source src={src} type="video/mp4" />
    </video>
  )
}
