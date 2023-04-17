import {
  getProfile,
  getStatus,
  updateStatus,
  updatePhoto,
  updateProfile,
} from './../api/api';
import {stopSubmit} from "redux-form";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SET_PHOTO = 'SET_PHOTO';
const SET_PROFILE = 'SET_PROFILE';

let initialState = {
  postData: [
    { id: '1', desc: 'Hi! How are you?', likes: '2' },
    { id: '2', desc: "It's my first project!", likes: '5' },
    { id: '3', desc: 'Hey', likes: '1' },
  ],
  profile: null,
  status: '',
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        postData: [
          ...state.postData,
          {
            id: 4,
            desc: action.newPostInput,
            likes: 0,
          },
        ],
      };
    case SET_USER_PROFILE:
      return { ...state, profile: action.profile };
    case SET_STATUS:
      return { ...state, status: action.status };
    case SET_PHOTO:
      return { ...state, profile: { ...state.profile, photos: action.photos } };
    case SET_PROFILE:
      return { ...state, profile: { ...action.profile } };

    default:
      return state;
  }
};

export const addPostActionCreator = (newPostInput) => {
  return {
    type: ADD_POST,
    newPostInput,
  };
};

export const setUserProfile = (profile) => {
  return {
    type: SET_USER_PROFILE,
    profile: profile,
  };
};

export const setStatus = (status) => {
  return {
    type: SET_STATUS,
    status,
  };
};

export const setPhotoSuccess = (photos) => {
  return {
    type: SET_PHOTO,
    photos,
  };
};

export const updateProfileSuccess = (profile) => {
  return {
    type: SET_PROFILE,
    profile,
  };
};

export const getProfileThunkCreator = (userId) => async (dispatch) => {
  let data = await getProfile(userId);
  dispatch(setUserProfile(data));
};

export const getUserStatus = (userId) => async (dispatch) => {
  let response = await getStatus(userId);
  dispatch(setStatus(response.data));
};

export const updateUserStatus = (status) => async (dispatch) => {
  let response = await updateStatus(status);
  if (response.data.resultCode === 0) dispatch(setStatus(status));
};

export const savePhoto = (file) => async (dispatch) => {
  let response = await updatePhoto(file);

  if (response.data.resultCode === 0)
    dispatch(setPhotoSuccess(response.data.data.photos));
};

export const setProfile = (profile) => async (dispatch, getState) => {
  let userId = getState().auth.userId;
  let response = await updateProfile(profile);
  if (response.data.resultCode === 0) {
    dispatch(getProfileThunkCreator(userId))
  } else {
    let message =
        response.data.messages.length > 0
            ? response.data.messages[0]
            : 'some error';
    dispatch(stopSubmit('AddNewInfoForm', { _error: message }));
    return Promise.reject(response.data.messages[0])
  }
};

export default profileReducer;
