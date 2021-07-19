import React, { useEffect, useRef, useState, useContext } from 'react'
import { useParams } from 'react-router-dom';
import { Grid } from '@material-ui/core'
import { VideoContext } from '../contexts/video/VideoState';

const initialState = {
  isPlaying: true,
  progress: 0,
  autoPlay: true,
}

export default function SingleVideoStream() {

  const { id } = useParams()
  const videoRef = useRef(null);
  let videoElem = videoRef.current
  const [video, setVideo] = useState(initialState)

  const { isPlaying, progress, autoPlay } = video

  const { getSingleVideoStream, singleVideo } = useContext(VideoContext);

  useEffect(() => {
    videoElem = videoRef.current
    if (videoElem) {
      getSingleVideoStream(id, videoElem)
      videoElem.ontimeupdate = function () {
        let forcedProgress: number = videoElem.currentTime / videoElem.duration
        setVideo(prevState => {
          return { ...prevState, progress: forcedProgress }
        })
      }
      return function () {
        // Na unmount to zkousim nahrat znova, aby to tam na okamzik nezustalo predchozi video, ale nejak se to nedari
        videoElem.load()
      }
    };
  }, []);

  const play = () => {
    setVideo({ ...video, isPlaying: true })
    videoElem.play()
  }

  const pause = () => {
    setVideo({ ...video, isPlaying: false })
    videoElem.pause()
  }

  const setTime = (e) => {
    let forcedProgress = e.nativeEvent.offsetX / e.target.offsetWidth
    setVideo(prevState => {
      videoElem.currentTime = forcedProgress * videoElem.duration
      return { ...prevState, progress: forcedProgress }
    })
  }

  return (
    <Grid container>
      <video style={{ width: '100%' }} id="videoPlayer" autoPlay={autoPlay} ref={videoRef} controls>
        <source src={`http://localhost:5000/video/stream/${singleVideo._id}`} type="video/mp4" />
      </video>
      <button onClick={isPlaying ? pause : play}>{isPlaying ? 'pause' : 'play'}</button>
      <div id='timelineBg' style={bgStyle} onClick={setTime}>
        <div
          id='timeline'
          style={{
            background: 'red',
            height: '20px',
            pointerEvents: 'none', // disable child element click event
            width: `${progress * 100}%`,
          }}
        />
      </div>
    </Grid>
  )
}

const bgStyle = {
  background: 'teal',
  width: '100%',
  padding: '10px 0',
}