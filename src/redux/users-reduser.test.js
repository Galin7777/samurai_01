import { usersReducer } from './users-reduser';
import { followSuccess } from './users-reduser';
import { unfollowSuccess } from './users-reduser';
import { setUsersAC } from './users-reduser';
import { setCurrentPageAC } from './users-reduser';
import { setTotalUsersCountAC } from './users-reduser';
import { toggleIsFetchingAC } from './users-reduser';
import { toggleIsFollowingProgressAC } from './users-reduser';


describe('usersReducer', () => {
  let state;
  const userId = 123;
  const currentPage = 2;
  const totalUsersCount = 8;
  const isFetching = true;

  beforeEach(() => {
    state = {
      users: [
        { id: 123, followed: false },
      ],
      pageSize: null,
      totalUsersCount: null,
      currentPage: null,
      isFetching: false,
      isFollowingInProgress: [],
    };
  });

  it('should create an action to follow a user', () => {
    //1. test data
    const action = followSuccess(userId);
    //2.action
    const newState = usersReducer(state, action);
    const usersFollow = newState.users.find((user) => user.id === userId);
    const filteredOldUsers = state.users.filter((user) => user.id !== userId);
    const filteredNewUsers = newState.users.filter((user) => user.id !== userId);
    //3.expectation
    expect(usersFollow.followed).toBe(true);
    expect(filteredOldUsers).toEqual(filteredNewUsers);
  });

  it('should create an action to unfollow a user', () => {
    //1. test data
    const action = unfollowSuccess(userId);
    //2.action
    const newState = usersReducer(state, action);
    const usersUnfollow = newState.users.find((user) => user.id === userId);
    const filteredOldUsers = state.users.filter((user) => user.id !== userId);
    const filteredNewUsers = newState.users.filter((user) => user.id !== userId);
    //3.expectation
    expect(usersUnfollow.followed).toBe(false);
    expect(filteredOldUsers).toEqual(filteredNewUsers);
  });

  it('should replace the users array with the one provided in the action', () => {
    //1. test data
    const initialState = {
      users: [
        { id: 1, name: 'Иван', followed: true },
        { id: 2, name: 'Андрей', followed: false },
      ],
      pageSize: 10,
      totalUsersCount: 20,
    };

    const newUsersData = [
      { id: 4, name: 'Галя', followed: true },
      { id: 5, name: 'Артем', followed: false },
    ];
    //2.action
    const action = setUsersAC(newUsersData);
    const newState = usersReducer(initialState, action);
    //3.expectation
    expect(newState.users).toEqual(newUsersData);
    expect(newState.users).not.toEqual(initialState.users);
    expect(newState.totalUsersCount).toBe(initialState.totalUsersCount);
    expect(newState.pageSize).toBe(initialState.pageSize);
  });

  it('should set current page number in usersReducer', () => {
    //1. test data
    const action = setCurrentPageAC(currentPage);
    //2.action
    const newState = usersReducer(state, action);
    //3.expectation
    expect(newState.currentPage).toBe(currentPage);
  });

  it('should set total users count in usersReducer', () => {
    //1. test data
    const action = setTotalUsersCountAC(totalUsersCount);
    //2.action
    const newState = usersReducer(state, action);
    //3.expectation
    expect(newState.totalUsersCount).toBe(totalUsersCount);
  });

  it('should set users loading status in usersReducer', () => {
    //1. test data
    const action = toggleIsFetchingAC(isFetching);
    //2.action
    const newState = usersReducer(state, action);
    //3.expectation
    expect(newState.isFetching).toBe(true);
  });

  it('should add userId to followingInProgress array if isFetching is true', () => {
    state.isFollowingInProgress = [13];
    //1. test data
    const action = toggleIsFollowingProgressAC(isFetching, userId);
    //2.action
    const newState = usersReducer(state, action);
    //3.expectation
    expect(newState.isFollowingInProgress.length).toBe(2);
    expect(newState.isFollowingInProgress).toContain(userId);
    expect(newState.isFollowingInProgress).toContain(13);
  });

  it('should remove userId from followingInProgress array if isFetching is false', () => {
    state.isFollowingInProgress = [13];
    //1. test data
    const action = toggleIsFollowingProgressAC(false, userId);
    //2.action
    const newState = usersReducer(state, action);
    //3.expectation
    expect(newState.isFollowingInProgress).not.toContain(userId);
  });
});
