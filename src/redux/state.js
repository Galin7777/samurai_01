const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';

export let store = {
  _state: {
    profilePage: { 
      posts: [
        {id: 1, message: 'Hi Andrey', likesCount: 5},
        {id: 2, message: 'It s my first post', likesCount: 25},
    ],
      newPostText: 'it-kamasutra.com'
  },
  
    dialogsPage: {
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
    },
  
    sidebar: [
      {id: 1, name: 'Andrey', img: 'https://avatars.mds.yandex.net/i?id=1b51d752492a7a110f7351455fb0a6b8b937fafa-12363187-images-thumbs&n=13'},
      {id: 2, name: 'Maks', img: 'https://avatars.mds.yandex.net/i?id=15e0d42ec8249b02f09de2fcc6e3c93041c7aee7-5884537-images-thumbs&n=13'},
      {id: 3, name: 'Anton' , img: 'https://avatars.mds.yandex.net/i?id=880e9586a1a2a70be93e1e46881aa752fdda465b-5498038-images-thumbs&n=13'},
    ],
  },
  _callSubscriber() {
    console.log('State changed');
   },

  getState() {
    return this._state;
  },
  
  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    if (action.type === ADD_POST) {
      const newPost = {
        id: this._state.profilePage.posts.length + 1,
        message: this._state.profilePage.newPostText,
        likesCount: 0
      };
      this._state.profilePage.posts = [...this._state.profilePage.posts, newPost];
      this._state.profilePage.newPostText = '';
      this._callSubscriber(this._state);
    } else if (action.type === UPDATE_NEW_POST_TEXT) {
        this._state.profilePage.newPostText = action.newText;
        this._callSubscriber(this._state);
    } else if (action.type === UPDATE_NEW_MESSAGE_BODY) {
      this._state.dialogsPage.newMessageBody = action.body;
      this._callSubscriber(this._state);
    }  else if (action.type === SEND_MESSAGE) {
      let body = this._state.dialogsPage.newMessageBody;
      this._state.dialogsPage.newMessageBody = '';
      this._state.dialogsPage.messages.push({ id: this._state.dialogsPage.messages.length + 1, message: body });
      this._callSubscriber(this._state);
    };
  },
};

export const addPostActionCreator = () => ({ type: ADD_POST });
export const updateNewPostTextActionCreator = (text) => 
  ({type: UPDATE_NEW_POST_TEXT, newText: text});

export const sendMessageCreator = () => ({ type: SEND_MESSAGE });
export const updateNewMessageBodyCreator = (body) => 
  ({ type: 'UPDATE-NEW-MESSAGE-BODY', body: body });
