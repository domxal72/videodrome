import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux'

// import store from './redux/store'
import App from './App';
import GlobalState from './contexts/global/GlobalState';
import VideoState from './contexts/video/VideoState';
import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    <GlobalState>
      <VideoState>
        <App />
      </VideoState>
    </GlobalState>
    {/* </Provider> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
