import React, { useEffect, useContext } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux'
import store from '../src/redux/store'
import { GlobalContext } from '../src/contexts/global/GlobalState'

import Header from './parts/Header';
import { Flex, FlexOut } from './ui/general/flex';
import Main from './parts/Main'
import SignUp from './parts/SignUp';
import Homepage from './screens/Homepage';
import Dashboard from './screens/Dashboard';
import VideoUpload from './screens/VideoUpload';
import Page404 from './screens/Page404';
import SingleVideo from './screens/SingleVideo';
import SingleVideoStream from './screens/SingleVideoStream';
import Sidebar from './parts/Sidebar';
import TooltipScreen from './screens/TooltipScreen';
import ProtectedRoute from './parts/ProtectedRoute';
import ProtectedScreen from './screens/ProtectedScreen';
import NotAuthorized from './parts/NotAuthorized';

function App() {

  const { getUserOnAppLoad } = useContext(GlobalContext)

  useEffect(() => {
    getUserOnAppLoad()
  }, [])

  return (
    <Router>
      <Main>
        <Header />
        <Flex pt={100} flexDirection='column' flex={1}>
          <Switch>
            <ProtectedRoute exact path="/">
              <Dashboard />
            </ProtectedRoute>
            <Route exact path="/home">
              <Homepage />
            </Route>
            <Route exact path="/tooltip">
              <TooltipScreen />
            </Route>
            <ProtectedRoute exact path="/protected">
              <ProtectedScreen />
            </ProtectedRoute>
            <Route exact path="/bro">
              <ProtectedScreen />
            </Route>
            <Route exact path="/not-authorized">
              <NotAuthorized />
            </Route>
            <Route exact path="/signup">
              <SignUp />
            </Route>
            <Route exact path="/videoupload">
              <VideoUpload />
            </Route>
            <Route exact path="/video/:id">
              <SingleVideo />
            </Route>
            <Route exact path="/video/stream/:id">
              <SingleVideoStream />
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
