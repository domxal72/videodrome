import React, { createContext, MouseEventHandler, useReducer } from 'react'
import GlobalReducer, { GET_VIDEOS, GET_USER_ON_APP_LOAD, LOG_IN_USER, LOG_OUT_USER } from './GlobalReducer';

interface IVideosState {
  id: number
  title?: string
  watched?: boolean
}

interface IGlobalState {
  user: {
    token: string | null
    isAuthenticated: boolean
    isLoading: boolean
    id: string | undefined
    email: string | undefined
  }
  videos: Array<IVideosState>
  getVideos?: MouseEventHandler
  getUserOnAppLoad?
  logInUser?
  logOutUser?
}

const initialState: IGlobalState = {
  videos: [
    { id: 0, title: 'Conan', watched: true, },
    { id: 1, title: 'Marketa Lazarova', watched: false, },
    { id: 2, title: 'Hardcode Henry', watched: true, },
  ],
  user: {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    id: undefined,
    email: undefined,
  },
}

export const GlobalContext = createContext(initialState);

// nutny to dat jako funkci, aby to bralo z localStorage vzdycky kdyz to volam a ne jako objekt, kterej se pak neaktualizuje
export const tokenConfig: any = () => {
  let config: any = {}
  config.headers = {
    'x-auth-token': localStorage.getItem('token'),
    'Content-Type': 'application/json',
  }
  return config
}

export default function GlobalState({ children }) {

  const [state, dispatch] = useReducer(GlobalReducer, initialState);

  const getVideos = () => dispatch({ type: GET_VIDEOS, payload: { text: 'nove videjko' } });

  const logInUser = (data) => {
    localStorage.setItem('token', data.token);
    dispatch({ type: LOG_IN_USER, payload: data });
  }

  const getUserOnAppLoad = async () => {
    try {
      const res = await fetch('/auth/get-user', tokenConfig())
      console.log(res)
      const data = await res.json()
      dispatch({ type: LOG_IN_USER, payload: data });
    } catch (error) {
      console.log('hej co se deje')
    }
  }

  const logOutUser = () => {
    const noUser = {
      token: null,
      isAuthenticated: false,
      isLoading: false,
      id: undefined,
      email: undefined,
    }
    localStorage.removeItem('token');
    dispatch({ type: LOG_OUT_USER, payload: noUser });
  }

  return (
    <GlobalContext.Provider
      value={{
        user: state.user,
        videos: state.videos,
        getVideos,
        logInUser,
        logOutUser,
        getUserOnAppLoad
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
