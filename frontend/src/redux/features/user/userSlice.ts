interface userState {
  id: number
  name?: string
  email?: string 
}

// const initialState = { 
//   id: undefined,
//   name: '',
//   email: '',
// }

const initialState: userState = { 
  id: 0,
  name: 'Lo wang',
  email: 'lowang@zilla.kage', 
}


// export default function userReducer(state, action) {
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'user/changeName': {
      return {
        ...state,
        name: action.payload,
      }
    }

    default:
      return state
  }
}
