import {stopSubmit} from 'redux-form';
import {authAPI, getCaptcha} from './../api/api';

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

const authReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case SET_AUTH_DATA:
            return {
                ...state, ...action.data, captcha: false
            };
        case SET_CAPTCHA:
            return {
                ...state, captcha: action.captcha
            }
        default:
            return state;
    }
};

type setAuthUserDataType = {
    type: typeof SET_AUTH_DATA
    data: { userId: number | null, login: string | null, email: string | null, isAuth: boolean }
}

export const setAuthUserData = (userId: number | null, login: string | null, email: string | null, isAuth: boolean): setAuthUserDataType => {
    return {
        type: SET_AUTH_DATA,
        data: {userId, login, email, isAuth},
    };
};

type setCaptchaType = {
    type: typeof SET_CAPTCHA
    captcha: string
}

export const setCaptcha = (captcha: string): setCaptchaType => {
    return {
        type: SET_CAPTCHA,
        captcha
    }

}

export const getAuthThunkCreator = () => async (dispatch: any) => {
    let data = await authAPI.me();
    if (data.resultCode === 0) {
        dispatch(
            setAuthUserData(data.data.id, data.data.login, data.data.email, true)
        );
    }
};

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
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

export const logout = () => async (dispatch: any) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
};

export const captchaTC = () => async (dispatch: any) => {
    let response = await getCaptcha();
    dispatch(setCaptcha(response.data.url))
}

export default authReducer;
