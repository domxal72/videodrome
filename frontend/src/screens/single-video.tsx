import React, { useEffect, Component, useRef } from 'react'
import { useParams } from 'react-router-dom';
import VideoContainer from '../parts/video-container';

export default function SingleVideo({ state, getSingleVideo, clearSingleVideo }) {

  const { id } = useParams()
  const videoRef = useRef(null);

  useEffect(() => {
    getSingleVideo(id, videoRef.current)
  }, []);

  return (
    <div>
      {id}
      {state.video && 
        <video style={{height: '400px', width: '600px'}} id="videoPlayer" controls autoPlay={false} ref={videoRef}>
          <source src={`http://localhost:5000/${state.video.videoSrc}`} type="video/mp4" />
        </video>
        // <VideoContainer src={`http://localhost:5000/${state.video.videoSrc}`} />
      }
    </div>
  )
}
