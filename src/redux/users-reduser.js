const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';

const initialState = {
  users: [
    { id: 1, fullName: 'Andrey', photoUrl: 'https://avatars.mds.yandex.net/i?id=61c44f87f138a7216888a7e00b69d84b7d578614-4291891-images-thumbs&n=13', followed: true, status: 'I like footbal!', location: { city: 'Minsk', country: 'Belarus' } },
    { id: 2, fullName: 'Sveta', photoUrl: 'https://avatars.mds.yandex.net/i?id=61c44f87f138a7216888a7e00b69d84b7d578614-4291891-images-thumbs&n=13', followed: false, status: 'I love my city.!', location: { city: 'Moscow', country: 'Russia' } },
    { id: 3, fullName: 'Sasha', photoUrl: 'https://avatars.mds.yandex.net/i?id=61c44f87f138a7216888a7e00b69d84b7d578614-4291891-images-thumbs&n=13', followed: true, status: 'I love my country.!', location: { city: 'Washington', country: 'America' } },
  ],
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map( user => {
          if (user.id === action.userId) {
            return { ...user, followed: true }
          }
          return user;
        })
      };

    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map( user => {
          if (user.id === action.userId) {
            return { ...user, followed: false }
          }
          return user;
        })
      };

    case SET_USERS: {
      return { ...state, users: [ ...state.users, ...action.users]}
      }
    default: 
      return state;

  };
};

export const followAC = (userId) => ({ type: FOLLOW, userId });
export const unfollowAC = (userId) => ({ type: UNFOLLOW, userId });
export const setUsersAC = (users) => ({ type: SET_USERS, users });
