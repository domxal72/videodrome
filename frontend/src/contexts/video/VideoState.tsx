import React, { createContext, useReducer } from 'react'
import VideoReducer, { GET_VIDEOS, GET_SINGLE_VIDEO } from './VideoReducer';

interface IVideosState {
  _id: number | string
  title: string
  description?: string
  img?: string
  videoSrc: string
}

interface IVideoState {
  videoList: Array<IVideosState>
  singleVideo: IVideosState
  getVideos?: Function
  getSingleVideo?: Function
  getSingleVideoStream?: Function
}

const initialState: IVideoState = {
  videoList: [],
  singleVideo: {
    _id: 0,
    title: '',
    videoSrc: ''
  },
}

export const VideoContext = createContext(initialState);

export default function VideoState({ children }) {

  const [{ videoList, singleVideo }, dispatch] = useReducer(VideoReducer, initialState);

  const config = {
    headers: {
      method: 'GET',
      'x-auth-token': localStorage.getItem('token'),
      'Content-type': 'application/json',
    }
  }

  const getVideos = async () => {
    try {
      const res = await fetch('/video/list', config)
      const data = await res.json()
      dispatch({ type: GET_VIDEOS, payload: data });
    } catch (error) {
      console.log('no videos loaded')
    }
  }

  const getSingleVideo = async (id, player) => {
    const config = {
      headers: {
        method: 'GET',
        'x-auth-token': localStorage.getItem('token'),
        'Content-type': 'application/json',
      }
    }

    try {
      const url = `/video/${id}`
      const res = await fetch(url, config)
      const data = await res.json()
      player.load()
      dispatch({ type: GET_SINGLE_VIDEO, payload: data })
    } catch (err) {
      console.log(err)
    }
  }

  const getSingleVideoStream = async (id, player) => {
    const config = {
      headers: {
        method: 'GET',
        'x-auth-token': localStorage.getItem('token'),
        'Content-type': 'application/json',
      }
    }

    try {
      const url = `/video/${id}`
      const res = await fetch(url, config)
      const data = await res.json()
      player.load()
      dispatch({ type: GET_SINGLE_VIDEO, payload: data })
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <VideoContext.Provider
      value={{
        videoList,
        singleVideo,
        getVideos,
        getSingleVideo,
        getSingleVideoStream,
      }}
    >
      {children}
    </VideoContext.Provider>
  )
}
