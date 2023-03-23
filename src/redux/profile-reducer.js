import { getProfile, getStatus, updateStatus } from './../api/api';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

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

export default profileReducer;
