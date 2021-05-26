import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Cookies from 'js-cookie';


import store from '../src/redux/store'

import Header from './parts/header';
import { Flex, FlexOut } from './ui/general/flex';
import Main from './parts/main'
import SignUp from './parts/sign-up';
import Homepage from './screens/homepage';
import Dashboard from './screens/dashboard';
import VideoUpload from './screens/video-upload';
import Page404 from './screens/page-404';
import SingleVideo from './screens/single-video';
import Sidebar from './parts/sidebar';

function App() {

  console.log(Cookies.get('jwt'))
  const initialState = { 
    isLoggedIn: Cookies.get('jwt'),
    user: {},
    videoList: [],
    video: {},
    infoMsg: null,
    test: undefined,
  }

  const [state, setState] = useState(initialState)

  const logInUser = (user) => {
    setState({...state, isLoggedIn: true, user })
    // redirect to dashboard after login
    window.location.assign('/')
  } 

  const logOutUser = () => {
    setState({...state, isLoggedIn: false })
  }

  const getVideoList = async () => {
    const res = await fetch('/video/list')
    const data = await res.json()

    console.log(data)
    setState({...state, videoList: data })
  } 

  const getSingleVideo = async (id, player) => {
    const res = await fetch(`/video/${id}`)
    const data = await res.json()

    console.log(data)
    await setState({...state, video: data })
    console.log(state.video)
    player?.load()

  }

  const clearSingleVideo = async () => {
    setState({...state, video: null })
    console.log(state.video)
  }

  const clearInfoMsg = () => {
    setState({...state, infoMsg: null })
  }

  const setInfoMsg = (infoMsg) => {
    setState({...state, infoMsg })
    setTimeout(() => {
      clearInfoMsg()
    }, 2000);
  }

  console.log('Initial state: ', store.getState())
  store.dispatch({ type: 'user/changeName', payload: 'Thulsa' })
  console.log('Initial state: ', store.getState())

  return (
    <Router>
      <Main>
        <Header state={state} logOutUser={logOutUser} />
        <Flex pt={100} flexDirection='column' flex={1}>
          <Switch>
            <Route exact path="/">
              {!state.isLoggedIn ? <Redirect to="/home" /> : <Dashboard state={state} getVideoList={getVideoList} />}
            </Route>
            <Route exact path="/home">
              <Homepage logInUser={logInUser} />
            </Route>
            <Route exact path="/signup">
              <SignUp logInUser={logInUser} />
            </Route>
            <Route exact path="/videoupload">
              <VideoUpload infoMsg={state.infoMsg} setInfoMsg={setInfoMsg} />
            </Route>
            <Route exact path="/video/:id">
              <SingleVideo state={state} getSingleVideo={getSingleVideo} clearSingleVideo={clearSingleVideo} />
            </Route>
            <Route path="/:path">
              <Page404 />
            </Route>
          </Switch>
        </Flex>
        <Sidebar />
      </Main>
    </Router>
  );
}

export default App;
