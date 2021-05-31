import React, { createContext, useReducer } from 'react'
import GlobalReducer, { GET_VIDEOS } from './GlobalReducer';

// interface globalState {
//   test?: string
// }

// const initialValue: globalState = {test: 'state'}

interface IVideosState {
  id: number
  title?: string
  watched?: boolean 
}

interface IGlobalState {
  videos: Array<IVideosState>,
  getVideos?: any,
}

const initialState: IGlobalState = {
  videos: [
    { id: 0, title: 'Conan', watched: true, },
    { id: 1, title: 'Marketa Lazarova', watched: false, },
    { id: 2, title: 'Hardcode Henry', watched: true, },
  ],
  // getVideos: ,
}

// const initialState = [
//   { id: 0, title: 'Conan', watched: true, },
//   { id: 1, title: 'Marketa Lazarova', watched: false, },
//   { id: 2, title: 'Hardcode Henry', watched: true, },
// ]

export const GlobalContext = createContext(initialState);
// export const GlobalContext = createContext(initialValue);

export default function GlobalState({children}) {

  const [state, dispatch] = useReducer(GlobalReducer, initialState);

  const getVideos = () => dispatch({ type: GET_VIDEOS, payload: {text: 'nove videjko'} });

  return (
    <GlobalContext.Provider
      value={{
        videos: state.videos,
        getVideos,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
