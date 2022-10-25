import { serverURL } from "../../constants/url";
import { USER_LOGIN, USER_REGISTER } from "./userActionType";
import axios from "axios";

// Login
export const loginSuccess = (payload) => {
  return {
    type: USER_LOGIN,
    err: payload.err,
  };
};

export const login = (input) => {
  return async (dispatch, getState) => {
    try {
      const { email, password } = input;
      const options = {
        method: "POST",
        url: `${serverURL}/users/login`,
        data: {
          email,
          password,
        },
      };
      const { data } = await axios(options);
      localStorage.setItem("access_token", data.access_token);
      const payload = { err: "" };
      return dispatch(loginSuccess(payload));
    } catch (err) {
      const payload = { err };
      return dispatch(loginSuccess(payload));
    }
  };
};

// Register
export const registerSuccess = (payload) => {
  return {
    type: USER_REGISTER,
    err: payload.err,
  };
};

export const register = (input) => {
  return async (dispatch, getState) => {
    try {
      const { username, email, password } = input;
      const options = {
        method: "POST",
        url: `${serverURL}/users/register`,
        data: {
          username,
          email,
          password,
        },
      };
      const { data } = await axios(options);
      localStorage.setItem("access_token", data.access_token);
      const payload = { err: "" };
      return dispatch(registerSuccess(payload));
    } catch (err) {
      const payload = { err };
      return dispatch(registerSuccess(payload));
    }
  };
};
