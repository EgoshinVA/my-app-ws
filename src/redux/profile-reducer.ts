import {profileAPI} from './../api/api';
import {stopSubmit} from "redux-form";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SET_PHOTO = 'SET_PHOTO';

type postDataType = {
  id: number
  desc: string
  likes: number
}
type contactsType = {
  github: string
  vk: string
  facebook: string
  instagram: string
  twitter: string
  website: string
  youtube: string
  mainLink: string
}
export type photosType = {
  small: string | null
  large: string | null
}

type profileType = {
  userId: number
  lookingForAJob: boolean
  lookingForAJobDescription: string
  fullName: string
  contacts: contactsType
  photos: photosType
}

let initialState = {
  postData: [
    { id: 1, desc: 'Hi! How are you?', likes: 2 },
    { id: 2, desc: "It's my first project!", likes: 5 },
    { id: 3, desc: 'Hey', likes: 1 },
  ] as Array<postDataType>,
  profile: null as profileType | null,
  status: '',
};

export type initialStateType = typeof initialState

const profileReducer = (state = initialState, action: any): initialStateType => {
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
      return { ...state, profile: { ...state.profile, photos: action.photos } as profileType };
    default:
      return state;
  }
};

type addPostActionCreatorType = {
  type: typeof ADD_POST
  newPostInput: string
}
export const addPostActionCreator = (newPostInput: string): addPostActionCreatorType => {
  return {
    type: ADD_POST,
    newPostInput,
  };
};

type setUserProfileType = {
  type: typeof SET_USER_PROFILE
  profile: object
}
export const setUserProfile = (profile: profileType): setUserProfileType => {
  return {
    type: SET_USER_PROFILE,
    profile
  };
};

type setStatusType = {
  type: typeof SET_STATUS
  status: string
}
export const setStatus = (status: string): setStatusType => {
  return {
    type: SET_STATUS,
    status,
  };
};

type setPhotoSuccessType = {
  type: typeof SET_PHOTO,
  photos: photosType
}
export const setPhotoSuccess = (photos: photosType): setPhotoSuccessType => {
  return {
    type: SET_PHOTO,
    photos,
  };
};

export const getProfileData = (userId: number) => async (dispatch: any) => {
  let data = await profileAPI.getProfile(userId);
  dispatch(setUserProfile(data));
};

export const getUserStatus = (userId: number) => async (dispatch: any) => {
  let response = await profileAPI.getStatus(userId);
  dispatch(setStatus(response.data));
};

export const updateUserStatus = (status: string) => async (dispatch: any) => {
  let response = await profileAPI.updateStatus(status);
  if (response.data.resultCode === 0) dispatch(setStatus(status));
};

export const savePhoto = (file: any) => async (dispatch: any) => {
  let response = await profileAPI.updatePhoto(file);

  if (response.data.resultCode === 0)
    dispatch(setPhotoSuccess(response.data.data.photos));
};

export const setProfile = (profile: profileType) => async (dispatch: any, getState: any) => {
  let userId = getState().auth.userId;
  let response = await profileAPI.updateProfile(profile);
  if (response.data.resultCode === 0) {
    dispatch(getProfileData(userId))
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
