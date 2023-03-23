const ADD_MESSAGE = 'ADD-MESSAGE';

let initialState = {
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
};

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return {
        ...state,
        messagesData: [
          ...state.messagesData,
          {
            id: 5,
            message: action.newMessageBody,
          },
        ],
      };

    default:
      return state;
  }
};

export const addMessageActionCreator = (newMessageBody) => {
  return {
    type: ADD_MESSAGE,
    newMessageBody,
  };
};

export default dialogsReducer;
