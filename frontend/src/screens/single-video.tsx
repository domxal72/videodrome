import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom';
import { Grid, Typography } from '@material-ui/core'
import VideoContainer from '../parts/video-container';

export default function SingleVideo({ getSingleVideo, clearSingleVideo }) {

  const { id } = useParams()
  // const { test = 7, test2 = 10 } = state
  // const { test = 7, test2 = 10, title, videoSrc } = state.video
  const videoRef = useRef(null);

  useEffect(() => {
    getSingleVideo(id, videoRef.current)
  }, []);

  return (
    <Grid container>
      {test}
      {/* {test2}
      {state.video && <Typography>{state.video.title}</Typography>}
      
      {title && <Typography>{title}</Typography>}
      {videoSrc && 
        <video style={{ width: '100%'}} id="videoPlayer" controls autoPlay={false} ref={videoRef}>
          <source src={`http://localhost:5000/${videoSrc}`} type="video/mp4" />
        </video>

      {state.video && <Typography>{state.video.title}</Typography>}
      {state.video && 
        <video style={{ width: '100%'}} id="videoPlayer" controls autoPlay={false} ref={videoRef}>
          <source src={`http://localhost:5000/${state.video.videoSrc}`} type="video/mp4" />
        </video>
        <VideoContainer src={`http://localhost:5000/${state.video.videoSrc}`} />
      } */}
    </Grid>
  )
}
