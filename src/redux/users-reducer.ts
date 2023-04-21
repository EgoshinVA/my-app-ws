import { updateObjectInArray } from '../utils/object-helpers';
import { usersAPI } from './../api/api';
import {photosType} from "./profile-reducer";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_IS_FATCHING = 'SET_IS_FATCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

type usersType = {
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

const usersReducer = (state = initialState, action: any): initialStateType => {
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
      return { ...state, users: [...action.users] };
    case SET_TOTAL_USERS_COUNT:
      return { ...state, totalUsersCount: action.count };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.currentPage };
    case SET_IS_FATCHING:
      return { ...state, isFetching: action.isFetching };
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

type followType = {
  type: typeof FOLLOW
  userID: number
}
export const follow = (userID: number): followType => {
  return {
    type: FOLLOW,
    userID: userID,
  };
};

type unfollowType = {
  type: typeof UNFOLLOW
  userID: number
}
export const unfollow = (userID: number): unfollowType => {
  return {
    type: UNFOLLOW,
    userID: userID,
  };
};

type setUsersType = {
  type: typeof SET_USERS
  users: Array<usersType>
}
export const setUsers = (users: Array<usersType>): setUsersType => {
  return {
    type: SET_USERS,
    users: users,
  };
};

type setTotalUsersCountType = {
  type: typeof SET_TOTAL_USERS_COUNT
  count: number
}
export const setTotalUsersCount = (count: number): setTotalUsersCountType => {
  return {
    type: SET_TOTAL_USERS_COUNT,
    count: count,
  };
};

type setCurrentPageType = {
  type: typeof SET_CURRENT_PAGE
  currentPage: number
}
export const setCurrentPage = (currentPage: number): setCurrentPageType => {
  return {
    type: SET_CURRENT_PAGE,
    currentPage: currentPage,
  };
};

type isFetchingChangeType = {
  type: typeof SET_IS_FATCHING
  isFetching: boolean
}
export const isFetchingChange = (isFetching: boolean): isFetchingChangeType => {
  return {
    type: SET_IS_FATCHING,
    isFetching: isFetching,
  };
};

type followInProgressType = {
  type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
  isFetching: boolean
  userId: number
}
export const followInProgress = (isFetching: boolean, userId: number): followInProgressType => {
  return {
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId,
  };
};

export const getUsersThunkCreator = (currentPage: number, pageSize: number) => async (dispatch: any) => {
    dispatch(isFetchingChange(true));
    let data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
    dispatch(isFetchingChange(false));
  };

const followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any, actionCreator: any) => {
  dispatch(followInProgress(true, userId));
  let data = await apiMethod(userId);
  if (data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(followInProgress(false, userId));
};

export const getUnfollowThunkCreator = (userId: number) => async (dispatch: any) => {
  followUnfollowFlow(
    dispatch,
    userId,
    usersAPI.getUnfollow.bind(usersAPI),
    unfollow
  );
};

export const getFollowThunkCreator = (userId: number) => async (dispatch: any) => {
  followUnfollowFlow(
    dispatch,
    userId,
    usersAPI.getFollow.bind(usersAPI),
    follow
  );
};

export default usersReducer;
