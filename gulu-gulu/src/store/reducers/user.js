import {
  USER_LOGIN,
  USER_REGISTER,
  ADD_BOOKMARK,
  DELETE_BOOKMARK,
  SHOW_BOOKMARK,
} from "../actions/userActionType";

const initialState = {
  loading: true,
  error: "",
  bookmarks: [],
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        error: action.error,
        loading: action.loading,
      };
    case USER_REGISTER:
      return {
        ...state,
        error: action.error,
        loading: action.loading,
      };
    case ADD_BOOKMARK:
      return {
        ...state,
        error: action.error,
        loading: action.loading,
      };
    case SHOW_BOOKMARK:
      return {
        ...state,
        error: action.error,
        loading: action.loading,
      };
    default:
      return state;
  }
}

export default userReducer;
