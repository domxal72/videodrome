import { createStore } from 'redux'
import rootReducer from './rootReducer'

// let preloadedState = {
//   user: {
//     id: 9999,
//     name: 'preloaded user',
//     email: 'none'
//   },
// }

const store = createStore(rootReducer)
// const store = createStore(rootReducer, preloadedState)

export default store