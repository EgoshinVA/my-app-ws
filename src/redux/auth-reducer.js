import { stopSubmit } from 'redux-form';
import { authAPI } from './../api/api';

const SET_AUTH_DATA = 'SET_AUTH_DATA';

let initialState = {
  userId: null,
  login: null,
  email: null,
  isAuth: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_DATA:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
};

export const setAuthUserData = (userId, login, email, isAuth) => {
  return {
    type: SET_AUTH_DATA,
    data: { userId, login, email, isAuth },
  };
};

export const getAuthThunkCreator = () => async (dispatch) => {
  let data = await authAPI.me();
  if (data.resultCode === 0) {
    dispatch(
      setAuthUserData(data.data.id, data.data.login, data.data.email, true)
    );
  }
};

export const login = (email, password, rememberMe) => async (dispatch) => {
  let response = await authAPI.login(email, password, rememberMe);
  if (response.data.resultCode === 0) {
    dispatch(getAuthThunkCreator());
  } else {
    let message =
      response.data.messages.length > 0
        ? response.data.messages[0]
        : 'some error';
    dispatch(stopSubmit('login', { _error: message }));
  }
};

export const logout = () => async (dispatch) => {
  let response = await authAPI.logout();
  if (response.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};

export default authReducer;
