import {FormAction, stopSubmit} from 'redux-form';
import {authAPI} from '../api/api';
import {ThunkAction} from "redux-thunk";
import {ActionsTypesInfer, appStateType} from "./redux-store";

const SET_AUTH_DATA = 'SET_AUTH_DATA';
const SET_CAPTCHA = 'SET_CAPTCHA';

let initialState = {
    userId: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isAuth: false,
    captcha: null as string | null
};

export type initialStateType = typeof initialState

type actionsType = ActionsTypesInfer<typeof authActions>

const authReducer = (state = initialState, action: actionsType): initialStateType => {
    switch (action.type) {
        case SET_AUTH_DATA:
            return {
                ...state, ...action.data,
            };
        case SET_CAPTCHA:
            return {
                ...state, captcha: action.captcha,
            }
        default:
            return state;
    }
};

export const authActions = {
    setAuthUserData: (userId: number | null, login: string | null, email: string | null, isAuth: boolean) => {
        return {type: SET_AUTH_DATA, data: {userId, login, email, isAuth}} as const;
    },
    setCaptcha: (captcha: string) => {
        return {type: SET_CAPTCHA, captcha} as const
    }
}



type ThunkType = ThunkAction<void, appStateType, unknown, actionsType | FormAction>

export const getAuthThunkCreator = (): ThunkType => async (dispatch) => {
    let data = await authAPI.me();
    if (data.resultCode === 0) {
        dispatch(authActions.setAuthUserData(data.data.id, data.data.login, data.data.email, true));
    }
};

export const login = (email: string, password: string, rememberMe: boolean, captcha: string):ThunkType => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.data.resultCode === 0) {
        dispatch(getAuthThunkCreator());
    } else {
        if (response.data.resultCode === 10)
            dispatch(captchaTC())
        let message =
            response.data.messages.length > 0
                ? response.data.messages[0]
                : 'some error';
        dispatch(stopSubmit('login', {_error: message}));
    }
};

export const logout = (): ThunkType => async (dispatch) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(authActions.setAuthUserData(null, null, null, false));
    }
};

export const captchaTC = (): ThunkType => async (dispatch) => {
    let response = await authAPI.getCaptcha();
    dispatch(authActions.setCaptcha(response.data.url))
}

export default authReducer;
