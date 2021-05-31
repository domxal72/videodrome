import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './rootReducer'

// let preloadedState = {
//   user: {
//     id: 9999,
//     name: 'preloaded user',
//     email: 'none'
//   },
// }

// Applied enhancer to initialize Redux dev tools extension in browser
const composedEnhancer = composeWithDevTools(
  // EXAMPLE: Add whatever middleware you actually want to use here
  // other store enhancers if any
)

const store = createStore(rootReducer, composedEnhancer)
// const store = createStore(rootReducer, preloadedState)

export default store