import {getAuthThunkCreator} from './auth-reducer';
import {ThunkAction} from "redux-thunk";
import {ActionsTypesInfer, appStateType} from "./redux-store";

const SET_INITIALIZED = 'SET_INITIALIZED';

let initialState = {
    initialized: false,
};

export type initialStateType = typeof initialState

type actionsType = ActionsTypesInfer<typeof appActions>

const appReducer = (state = initialState, action: actionsType): initialStateType => {
    switch (action.type) {
        case SET_INITIALIZED:
            return {
                ...state,
                initialized: true,
            };
        default:
            return state;
    }
};

export const appActions = {
    initializedSuccess: () => ({type: SET_INITIALIZED} as const)
}

export const initializeApp = ():
    ThunkAction<void, appStateType, unknown, actionsType> => (dispatch) => {
    let promise = dispatch(getAuthThunkCreator());
    Promise.all([promise]).then(() => {
        dispatch(appActions.initializedSuccess());
    });
};

export default appReducer;
