
export const GET_VIDEOS = 'VIDEOS/GET_VIDEOS'

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

    default:
      return state;
  }
};