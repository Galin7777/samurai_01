const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';
const SEND_MESSAGE = 'SEND_MESSAGE';

const initialState = {
  dialogs: [
    {id: 1, name: 'Andrey', photo: 'https://avatars.mds.yandex.net/i?id=1b51d752492a7a110f7351455fb0a6b8b937fafa-12363187-images-thumbs&n=13'},
    {id: 2, name: 'Maks', photo: 'https://avatars.mds.yandex.net/i?id=15e0d42ec8249b02f09de2fcc6e3c93041c7aee7-5884537-images-thumbs&n=13'},
    {id: 3, name: 'Anton', photo: 'https://avatars.mds.yandex.net/i?id=15e0d42ec8249b02f09de2fcc6e3c93041c7aee7-5884537-images-thumbs&n=13'},
    {id: 4, name: 'Sveta', photo: 'https://avatars.mds.yandex.net/i?id=15e0d42ec8249b02f09de2fcc6e3c93041c7aee7-5884537-images-thumbs&n=13'},
    {id: 5, name: 'Stas', photo: 'https://avatars.mds.yandex.net/i?id=880e9586a1a2a70be93e1e46881aa752fdda465b-5498038-images-thumbs&n=13'},
    {id: 6, name: 'Sasha', photo: 'https://avatars.mds.yandex.net/i?id=880e9586a1a2a70be93e1e46881aa752fdda465b-5498038-images-thumbs&n=13'},
],

  messages: [
    {id: 1, message: 'Hi'},
    {id: 2, message: 'Hi is your kamasutra'},
    {id: 3, message: 'Yo'} ,
  ],
  newMessageBody: ''
};

export const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NEW_MESSAGE_BODY:
      return {
        ...state,
        newMessageBody: action.body
      };

    case SEND_MESSAGE:
      return {
        ...state,
        messages: [
          ...state.messages,
          { id: state.messages.length + 1, message: state.newMessageBody }
        ],
        newMessageBody: ''
      };

    default:
      return state;
  }
};

export const sendMessageCreator = () => ({ type: SEND_MESSAGE });
export const updateNewMessageBodyCreator = (body) => ({ type: UPDATE_NEW_MESSAGE_BODY, body });
 