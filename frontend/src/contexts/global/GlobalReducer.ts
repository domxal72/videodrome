export const GET_USER_ON_APP_LOAD = 'USER/GET_USER_ON_APP_LOAD'
export const LOG_IN_USER = 'USER/LOG_IN_USER'
export const LOG_OUT_USER = 'USER/LOG_OUT_USER'

export default function GlobalReducer(state, action) {
  switch (action.type) {
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