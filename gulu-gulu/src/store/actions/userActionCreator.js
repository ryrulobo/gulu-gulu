import { serverURL } from "../../constants/url";
import {
  USER_LOGIN,
  USER_REGISTER,
  ADD_BOOKMARK,
  DELETE_BOOKMARK,
  SHOW_BOOKMARK,
} from "./userActionType";
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

// Add bookmark
export const addBookmarkSuccess = (payload) => {
  return {
    type: ADD_BOOKMARK,
    err: payload.err,
  };
};

export const addBookmark = (payload, access_token) => {
  return async (dispatch, getState) => {
    try {
      const options = {
        method: "POST",
        url: `${serverURL}/users/bookmark`,
        data: {
          datePublished: payload.datePublished,
          provider: payload.provider,
          thumbnail: payload.image,
          name: payload.name,
          description: payload.description,
          url: payload.url,
        },
        headers: { access_token },
      };
      await axios(options);
      const result = { err: "" };
      return dispatch(addBookmarkSuccess(result));
    } catch (err) {
      const result = { err };
      return dispatch(addBookmarkSuccess(result));
    }
  };
};

// Show bookmarks
export const showBookmarkSuccess = (payload) => {
  return {
    type: SHOW_BOOKMARK,
    err: payload.err,
    data: payload.data,
  };
};

export const showBookmark = (access_token) => {
  return async (dispatch, getState) => {
    try {
      const options = {
        method: "GET",
        url: `${serverURL}/users/bookmark`,
        headers: { access_token },
      };
      const { data } = await axios(options);
      const result = { data, err: "" };
      return dispatch(showBookmarkSuccess(result));
    } catch (err) {
      const result = { err };
      return dispatch(showBookmarkSuccess(result));
    }
  };
};

// Delete bookmark
export const deleteBookmarkSuccess = (payload) => {
  return {
    type: DELETE_BOOKMARK,
    err: payload.err,
  };
};

export const deleteBookmark = (url, access_token) => {
  return async (dispatch, getState) => {
    try {
      const options = {
        method: "DELETE",
        url: `${serverURL}/users/bookmark`,
        data: {
          url,
        },
        headers: { access_token },
      };
      await axios(options);
      const result = { err: "" };
      return dispatch(deleteBookmarkSuccess(result));
    } catch (err) {
      const result = { err };
      return dispatch(deleteBookmarkSuccess(result));
    }
  };
};
