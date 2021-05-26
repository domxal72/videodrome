import { combineReducers } from 'redux'

import videosReducer from './features/videos/videosSlice'
import userReducer from './features/user/userSlice'

const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  user: userReducer,
  videos: videosReducer,
})

export default rootReducer
