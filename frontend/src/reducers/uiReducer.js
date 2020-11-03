const initialState = {
  loading: false,
  errors: {}
}

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ERRORS":
      console.log(action.payload);
      return {
        loading: false, errors: action.payload
      }
    case "CLEAR_ERRORS":
      return initialState
    case "LOADING_UI":
      return {
        loading: true, errors: {}
      }
    case "STOP_LOADING_UI":
      return {
        ...state, loading: false
      }
    default:
      return state;
  }
}