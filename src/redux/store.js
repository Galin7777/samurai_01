import { profileReducer } from './profile-reducer';
import { dialogsReducer } from './dialogs-reducer';
import { sidebarReducer } from './sidebar-reducer';

export const store = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, message: 'Hi Andrey', likesCount: 5 },
        { id: 2, message: 'It s my first post', likesCount: 25 },
      ],
      newPostText: 'it-kamasutra.com',
    },

    dialogsPage: {
      dialogs: [
        { id: 1, name: 'Andrey', photo: 'https://avatars.mds.yandex.net/i?id=1b51d752492a7a110f7351455fb0a6b8b937fafa-12363187-images-thumbs&n=13' },
        { id: 2, name: 'Maks', photo: 'https://avatars.mds.yandex.net/i?id=15e0d42ec8249b02f09de2fcc6e3c93041c7aee7-5884537-images-thumbs&n=13' },
        { id: 3, name: 'Anton', photo: 'https://avatars.mds.yandex.net/i?id=15e0d42ec8249b02f09de2fcc6e3c93041c7aee7-5884537-images-thumbs&n=13' },
        { id: 4, name: 'Sveta', photo: 'https://avatars.mds.yandex.net/i?id=15e0d42ec8249b02f09de2fcc6e3c93041c7aee7-5884537-images-thumbs&n=13' },
        { id: 5, name: 'Stas', photo: 'https://avatars.mds.yandex.net/i?id=880e9586a1a2a70be93e1e46881aa752fdda465b-5498038-images-thumbs&n=13' },
        { id: 6, name: 'Sasha', photo: 'https://avatars.mds.yandex.net/i?id=880e9586a1a2a70be93e1e46881aa752fdda465b-5498038-images-thumbs&n=13' },
      ],

      messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'Hi is your kamasutra' },
        { id: 3, message: 'Yo' },
      ],
      newMessageBody: '',
    },

    sidebar: [
      { id: 1, name: 'Andrey', img: 'https://avatars.mds.yandex.net/i?id=1b51d752492a7a110f7351455fb0a6b8b937fafa-12363187-images-thumbs&n=13' },
      { id: 2, name: 'Maks', img: 'https://avatars.mds.yandex.net/i?id=15e0d42ec8249b02f09de2fcc6e3c93041c7aee7-5884537-images-thumbs&n=13' },
      { id: 3, name: 'Anton', img: 'https://avatars.mds.yandex.net/i?id=880e9586a1a2a70be93e1e46881aa752fdda465b-5498038-images-thumbs&n=13' },
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
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    this._state.sidebar = sidebarReducer(this._state.sidebar, action);

    this._callSubscriber(this._state);
  },
};
