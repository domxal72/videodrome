import React, { useState } from 'react'

const initialState = {
  isPlaying: false,
}

export default function VideoControls({ forwardedRef }) {

  const [video, setVideo] = useState(initialState)
  const { isPlaying } = video
  const videoElem = forwardedRef.current
  // const { duration } = videoElem

  const play = () => {
    setVideo({ ...video, isPlaying: !isPlaying })
    videoElem.play()
  }

  const pause = () => {
    setVideo({ ...video, isPlaying: !isPlaying })
    videoElem.pause()
  }

  const showInfo = () => {
    // console.log(duration)
  }

  return (
    <div>
      {/* <button onClick={isPlaying ? pause : play}>{isPlaying ? 'pause' : 'play'}</button>
      <button onClick={showInfo}>info</button> */}
    </div>
  )
}
