import {profileAPI} from '../api/api';
import {FormAction, stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {ActionsTypesInfer, appStateType} from "./redux-store";
import {profileInfoFormValuesType} from "../components/Profile/Page/ProfileInfoForm";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SET_PHOTO = 'SET_PHOTO';

export type postDataType = {
    id: number
    desc: string
    likes: number
}
export type contactsType = {
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

export type profileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe: string | null
    fullName: string
    contacts: contactsType
    photos: photosType
}

let initialState = {
    postData: [
        {id: 1, desc: 'Hi! How are you?', likes: 2},
        {id: 2, desc: "It's my first project!", likes: 5},
        {id: 3, desc: 'Hey', likes: 1},
    ] as Array<postDataType>,
    profile: null as profileType | null,
    status: '',
};

export type initialStateType = typeof initialState

const profileReducer = (state = initialState, action: actionsType): initialStateType => {
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
            return {...state, profile: action.profile};
        case SET_STATUS:
            return {...state, status: action.status};
        case SET_PHOTO:
            return {...state, profile: {...state.profile, photos: action.photos} as profileType};
        default:
            return state;
    }
};

type actionsType = ActionsTypesInfer<typeof profileActions>

export const profileActions = {
    addPost: (newPostInput: string) => {
        return {type: ADD_POST, newPostInput} as const;
    },
    setUserProfile: (profile: profileType) => {
        return {type: SET_USER_PROFILE, profile} as const;
    },
    setStatus: (status: string) => {
        return {type: SET_STATUS, status} as const;
    },
    setPhotoSuccess: (photos: photosType) => {
        return {type: SET_PHOTO, photos} as const;
    }
}

type ThunkType = ThunkAction<void, appStateType, unknown, actionsType | FormAction>

export const getProfileData = (userId: number | null): ThunkType => async (dispatch) => {
    let data = await profileAPI.getProfile(userId);
    dispatch(profileActions.setUserProfile(data));
};

export const getUserStatus = (userId: number | null): ThunkType => async (dispatch) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(profileActions.setStatus(response.data));
};

export const updateUserStatus = (status: string): ThunkType => async (dispatch) => {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) dispatch(profileActions.setStatus(status));
};

export const savePhoto = (file: any): ThunkType => async (dispatch) => {
    let data = await profileAPI.updatePhoto(file);
    if (data.resultCode === 0)
        dispatch(profileActions.setPhotoSuccess(data.data));
};

export const setProfile = (profile: profileInfoFormValuesType): ThunkType => async (dispatch, getState) => {
    let userId = getState().auth.userId;
    let response = await profileAPI.updateProfile(profile);
    if (response.data.resultCode === 0) {
        dispatch(getProfileData(userId))
    } else {
        let message =
            response.data.messages.length > 0
                ? response.data.messages[0]
                : 'some error';
        dispatch(stopSubmit('AddNewInfoForm', {_error: message}));
        return Promise.reject(response.data.messages[0])
    }
};

export default profileReducer;
