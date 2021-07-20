import React, { createContext, useReducer } from 'react'
import GlobalReducer,
{
  GET_USER_ON_APP_LOAD,
  LOG_IN_USER,
  LOG_OUT_USER
} from './GlobalReducer';

interface IGlobalState {
  user: {
    token: string | null
    isAuthenticated: boolean
    isLoading: boolean
    id: string | undefined
    email: string | undefined
    role: string | undefined
  }
  getUserOnAppLoad?
  logInUser?
  logOutUser?
}

const initialState: IGlobalState = {
  user: {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    id: undefined,
    email: undefined,
    role: undefined,
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

  const logInUser = (data) => {
    localStorage.setItem('token', data.token);
    dispatch({ type: LOG_IN_USER, payload: data });
  }

  const getUserOnAppLoad = async () => {
    try {
      const res = await fetch('/auth/get-user', tokenConfig())
      const data = await res.json()
      if (data.id) {
        dispatch({ type: GET_USER_ON_APP_LOAD, payload: data });
      }
    } catch (error) {
      console.log('getUserOnAppLoad err')
    }
  }

  const logOutUser = () => {
    const noUser = {
      token: null,
      isAuthenticated: false,
      isLoading: false,
      id: undefined,
      email: undefined,
      role: undefined,
    }
    localStorage.removeItem('token');
    dispatch({ type: LOG_OUT_USER, payload: noUser });
  }

  return (
    <GlobalContext.Provider
      value={{
        user: state.user,
        logInUser,
        logOutUser,
        getUserOnAppLoad
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
