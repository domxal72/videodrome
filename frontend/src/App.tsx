import React, { useEffect, useState, useContext } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Cookies from 'js-cookie';

import { useSelector, useDispatch } from 'react-redux'
import store from '../src/redux/store'
import { GlobalContext } from '../src/contexts/global/GlobalState'

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
import TooltipScreen from './screens/TooltipScreen';

// const selectVideos = state => state.videos

function App() {



  const { getUserOnAppLoad } = useContext(GlobalContext)

  useEffect(() => {
    getUserOnAppLoad()
  }, [])


  // const dispatch = useDispatch()

  const getVideoList = async () => {
    const res = await fetch('/video/list')
    const data = await res.json()

    console.log(data)
    // setState({ ...state, videoList: data })
  }

  const getSingleVideo = async (id, player) => {
    const res = await fetch(`/video/${id}`)
    const data = await res.json()

    // console.log(data)
    // await setState({ ...state, video: data })
    // console.log(state.video)
    // player?.load()

  }

  const clearSingleVideo = async () => {
    // setState({ ...state, video: null })
    // console.log(state.video)
  }

  // const videos = useSelector(selectVideos)
  // useSelector(state => state)

  // const addVideo = () => {
  //   dispatch({ type: 'videos/videoAdded', payload: 'new video text' })
  //   dispatch({ type: 'user/changeName', payload: 'ohoj' })
  // }

  return (
    <Router>
      <Main>
        <Header />
        <Flex pt={100} flexDirection='column' flex={1}>
          <Switch>
            <Route exact path="/">
              <Dashboard getVideoList={getVideoList} />
            </Route>
            <Route exact path="/home">
              <Homepage />
            </Route>
            <Route exact path="/tooltip">
              <TooltipScreen />
            </Route>
            <Route exact path="/signup">
              <SignUp />
            </Route>
            <Route exact path="/videoupload">
              <VideoUpload />
            </Route>
            <Route exact path="/video/:id">
              <SingleVideo getSingleVideo={getSingleVideo} clearSingleVideo={clearSingleVideo} />
            </Route>
            <Route path="/:path">
              <Page404 />
            </Route>
          </Switch>
        </Flex>
        <Sidebar />
        {/* <button onClick={addVideo}>add video</button> */}
      </Main>
    </Router>
  );
}

export default App;
