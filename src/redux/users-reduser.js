import { usersAPI } from '../api/api';
import { followAPI } from '../api/api';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

const initialState = {
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  isFollowingInProgress: [],
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userId) {
            return { ...user, followed: true };
          }
          return user;
        }),
      };

    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userId) {
            return { ...user, followed: false };
          }
          return user;
        }),
      };

    case SET_USERS: {
      return { ...state, users: action.users };
    }

    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.currentPage };

    case SET_TOTAL_USERS_COUNT:
      return { ...state, totalUsersCount: action.totalUsersCount };

    case TOGGLE_IS_FOLLOWING_PROGRESS:
      return {
        ...state, isFollowingInProgress: action.isFetching
          ? [...state.isFollowingInProgress, action.userId]
          : state.isFollowingInProgress.filter((id) => id !== action.userId),
      };

    case TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.isFetching };

    default:
      return state;

  };
};

export const followSuccess = (userId) => ({ type: FOLLOW, userId });
export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId });
export const setUsersAC = (users) => ({ type: SET_USERS, users });
export const setCurrentPageAC = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage });
export const setTotalUsersCountAC = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, totalUsersCount });
export const toggleIsFetchingAC = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });
export const toggleIsFollowingProgressAC = (isFetching, userId) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId });

export const getUsers = (pageNumber, pageSize) => {
  return async (dispatch) => {
    dispatch(toggleIsFetchingAC(true));
    try {
      const response = await usersAPI.getUsers(pageNumber, pageSize);
      dispatch(setUsersAC(response.items));
      dispatch(setTotalUsersCountAC(response.totalCount));
    } catch (error) {
      console.error('Ошибка при загрузке пользователей:', error);
    }
    dispatch(toggleIsFetchingAC(false));
  };
};

export const follow = (userId) => {
  return async (dispatch, getState) => {
    dispatch(toggleIsFollowingProgressAC(true, userId));

    try {
      const response = await followAPI.postFollow(userId);

      if (response.resultCode === 0) {
        const { currentPage, pageSize } = getState().usersPage;
        dispatch(getUsers(currentPage, pageSize)); // обновляем список после Follow
      }
    } catch (error) {
      console.error('Ошибка при подписке:', error);
    } finally {
      dispatch(toggleIsFollowingProgressAC(false, userId));
    }
  };
};

export const unfollow = (userId) => {
  return async (dispatch, getState) => {
    dispatch(toggleIsFollowingProgressAC(true, userId));

    try {
      const response = await followAPI.deleteFollow(userId);

      if (response.resultCode === 0) {
        const { currentPage, pageSize } = getState().usersPage;
        dispatch(getUsers(currentPage, pageSize)); // обновляем список после unfollow
      }
    } catch (error) {
      console.error('Ошибка при подписке:', error);
    } finally {
      dispatch(toggleIsFollowingProgressAC(false, userId));
    }
  };
};
