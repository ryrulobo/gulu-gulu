import { USER_LOGIN, USER_REGISTER } from "../actions/userActionType";

const initialState = {
  user: [],
  loading: true,
  error: "",
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
    default:
      return state;
  }
}

export default userReducer;
