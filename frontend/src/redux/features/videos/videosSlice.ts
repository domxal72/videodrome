interface videosState {
  id: number
  title?: string
  watched?: boolean 
}

const initialState: Array<videosState> = [
  { id: 0, title: 'Conan', watched: true, },
  { id: 1, title: 'Marketa Lazarova', watched: false, },
  { id: 2, title: 'Hardcode Henry', watched: true, },
]

function nextVideoId(todos) {
  const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
  return maxId + 1
}

export default function videosReducer(state = initialState, action) {
  switch (action.type) {
    case 'videos/videoAdded': {
      // Can return just the new todos array - no extra object around it
      return [
        ...state,
        {
          id: nextVideoId(state),
          text: action.payload,
          watched: false,
        },
      ]
    }

    default:
      return state
  }
}
