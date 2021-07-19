export const GET_VIDEOS = 'VIDEOS/GET_VIDEOS'
export const GET_SINGLE_VIDEO = 'VIDEOS/GET_SINGLE_VIDEO'

export default function VideoReducer(state, action) {
  switch (action.type) {
    case GET_VIDEOS:
      return {
        ...state,
        videoList: action.payload
      }
    case GET_SINGLE_VIDEO:
      return {
        ...state,
        singleVideo: action.payload
      }
    default:
      return state;
  }
};