import { dialogsReducer } from './dialogs-reducer';
import { sendMessageCreator } from './dialogs-reducer';

const state = {
  messages: [
    { id: 1, message: 'Hi' },
    { id: 2, message: 'Hi is your kamasutra' },
    { id: 3, message: 'Yo' },
  ],
};

it('should create action to send message in dialogsReducer', () => {
  //1. test data
  const action = sendMessageCreator('Hi');
  //2.action
  const newState = dialogsReducer(state, action);
  //3.expectation
  expect(newState.messages.length).toEqual(4);
});
