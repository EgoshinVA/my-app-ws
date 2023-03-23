import dialogsReducer from './dialogs-reducer';
import profileReducer from './profile-reducer';

let store = {
  _state: {
    profile: {
      postData: [
        { id: '1', desc: 'Hi! How are you?', likes: '2' },
        { id: '2', desc: "It's my first project!", likes: '5' },
        { id: '3', desc: 'Hey', likes: '1' },
      ],
      inputValue: '',
    },
    dialogs: {
      dialogsData: [
        { id: '1', name: 'Mattew' },
        { id: '2', name: 'Andrew' },
        { id: '3', name: 'John' },
        { id: '4', name: 'Max' },
      ],

      messagesData: [
        { id: '1', message: 'Hi!' },
        { id: '2', message: 'Whats up!' },
        { id: '3', message: 'Hey' },
        { id: '4', message: 'hello' },
      ],
      inputMessageValue: '',
    },
  },
  subscribe(observer) {
    this.reRender = observer;
  },
  getState() {
    return this._state;
  },
  reRender() {},

  dispatch(action) {
    this._state.profile = profileReducer(this._state.profile, action);
    this._state.dialogs = dialogsReducer(this._state.dialogs, action);
    this.reRender();
  },
};

export default store;
