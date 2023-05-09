import {updateObjectInArray} from '../utils/object-helpers';
import {usersAPI} from '../api/api';
import {photosType} from "./profile-reducer";
import {ThunkAction} from "redux-thunk";
import {ActionsTypesInfer, appStateType} from "./redux-store";
import {Dispatch} from "redux";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_IS_FATCHING = 'SET_IS_FATCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

export type usersType = {
    id: number
    name: string
    status: string
    photos: photosType
    followed: boolean
}

let initialState = {
    users: [] as Array<usersType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>,
};

export type initialStateType = typeof initialState

const usersReducer = (state = initialState, action: actionsType): initialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, 'id', {
                    followed: true,
                }),
            };
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, 'id', {
                    followed: false,
                }),
            };
        case SET_USERS:
            return {...state, users: [...action.users]};
        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.count};
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage};
        case SET_IS_FATCHING:
            return {...state, isFetching: action.isFetching};
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter((id) => id !== action.userId),
            };
        default:
            return state;
    }
};

type actionsType = ActionsTypesInfer<typeof usersActions>;

export const usersActions = {
    follow: (userID: number) => {
        return {type: FOLLOW, userID: userID} as const
    },
    unfollow: (userID: number) => {
        return {type: UNFOLLOW, userID: userID} as const
    },
    setUsers: (users: Array<usersType>) => {
        return {type: SET_USERS, users: users} as const
    },
    setTotalUsersCount: (count: number) => {
        return {type: SET_TOTAL_USERS_COUNT, count: count} as const
    },
    setCurrentPage: (currentPage: number) => {
        return {type: SET_CURRENT_PAGE, currentPage: currentPage} as const
    },
    isFetchingChange: (isFetching: boolean) => {
        return {type: SET_IS_FATCHING, isFetching: isFetching} as const
    },
    followInProgress: (isFetching: boolean, userId: number) => {
        return {type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId} as const
    }
}


export const getUsersThunkCreator = (currentPage: number, pageSize: number):
    ThunkAction<void, appStateType, unknown, actionsType> => async (dispatch) => {
    dispatch(usersActions.isFetchingChange(true));
    let data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(usersActions.setUsers(data.items));
    dispatch(usersActions.setTotalUsersCount(data.totalCount));
    dispatch(usersActions.isFetchingChange(false));
};

const _followUnfollowFlow = async (dispatch: Dispatch<actionsType>, userId: number, apiMethod: any, actionCreator: (userId: number) => actionsType) => {
    dispatch(usersActions.followInProgress(true, userId));
    let data = await apiMethod(userId);
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(usersActions.followInProgress(false, userId));
};

export const getUnfollowThunkCreator = (userId: number):
    ThunkAction<void, appStateType, unknown, actionsType> => async (dispatch) => {
    _followUnfollowFlow(
        dispatch,
        userId,
        usersAPI.getUnfollow.bind(usersAPI),
        usersActions.follow
    );
};

export const getFollowThunkCreator = (userId: number):
    ThunkAction<void, appStateType, unknown, actionsType> => async (dispatch) => {
    _followUnfollowFlow(
        dispatch,
        userId,
        usersAPI.getFollow.bind(usersAPI),
        usersActions.follow
    );
};

export default usersReducer;
