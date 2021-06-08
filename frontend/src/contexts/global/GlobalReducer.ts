
export const GET_VIDEOS = 'VIDEOS/GET_VIDEOS'

export const GET_USER_ON_APP_LOAD = 'USER/GET_USER_ON_APP_LOAD'
export const LOG_IN_USER = 'USER/LOG_IN_USER'
export const LOG_OUT_USER = 'USER/LOG_OUT_USER'

// function nextVideoId(todos) {
//   const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
//   return maxId + 1
// }

export default function GlobalReducer(state, action) {
  switch (action.type) {
    case GET_VIDEOS:
      return {
        ...state,
        videos: [
          ...state.videos,
          {
            id: 6,
            text: action.payload,
            watched: false,
          }
        ]
      }
    case GET_USER_ON_APP_LOAD:
      return {
        ...state,
        user: {
          isAuthenticated: true,
          ...action.payload
        }
      }
    case LOG_IN_USER:
      return {
        ...state,
        user: {
          isAuthenticated: true,
          ...action.payload
        }
      }
    case LOG_OUT_USER:
      return {
        ...state,
        user: action.payload
      }
    default:
      return state;
  }
};