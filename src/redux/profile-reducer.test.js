import { profileReducer } from './profile-reducer';
import { addPostActionCreator } from './profile-reducer';
import { deletePost } from './profile-reducer';

const state = {
  posts: [
    { id: 1, message: 'Hi, how are you', likesCount: 15 },
    { id: 2,  message: 'My first post', likesCount: 20 },
  ],
};

it('length of posts should be incremented', () => {
  //1. test data
  const action = addPostActionCreator('Vera');
  //2.action
  const newState = profileReducer(state, action);
  //3.expectation
  expect(newState.posts.length).toBe(3);
});

it('message of new post should be correct', () => {
  //1. test data
  const action = addPostActionCreator('Vera');
  //2.action
  const newState = profileReducer(state, action);
  //3.expectation
  expect(newState.posts[2].message).toBe('Vera');
});

it('after deleting length of message shoul be decrement', () => {
  //1. test data
  const action = deletePost(1);
  //2.action
  const newState = profileReducer(state, action);
  //3.expectation
  expect(newState.posts.length).toBe(1);
});

it('after deleting length shouldn`t be decrement if id is incorrect', () => {
  //1. test data
  const action = deletePost(100);
  //2.action
  const newState = profileReducer(state, action);
  //3.expectation
  expect(newState.posts.length).toBe(2);
});
