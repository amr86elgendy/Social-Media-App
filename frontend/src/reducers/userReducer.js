const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  likes: [],
  notifications: [],
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING_USER":
      return {
        ...state, loading: true
      }
    case "SET_AUTHENTICATED":
      return {
        ...state, authenticated: true, loading: false
      }
    case "SET_UNAUTHENTICATED":
      return initialState
    case "SET_USER":
      return {
        authenticated: true, loading: false, ...action.payload
      }
    case "LIKE_POST":
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            username: state.credentials.username,
            postId: action.payload._id
          }
        ]
      }
    case "UNLIKE_POST":
      return {
        ...state,
        likes: state.likes.filter(like => like.postId !== action.payload._id)
      }
    case "MARK_NOTIFICATION_READ":
      state.notifications.forEach((not) => (not.read = true));
      return {
        ...state
      };
    default:
      return state;
  }
}