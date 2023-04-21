const ADD_MESSAGE = 'ADD-MESSAGE';

type dialogType = {
    id: number
    name: string
}
type messageType = {
    id: number
    message: string
}

let initialState = {
    dialogsData: [
        {id: 1, name: 'Mattew'},
        {id: 2, name: 'Andrew'},
        {id: 3, name: 'John'},
        {id: 4, name: 'Max'},
    ] as Array<dialogType>,

    messagesData: [
        {id: 1, message: 'Hi!'},
        {id: 2, message: 'Whats up!'},
        {id: 3, message: 'Hey'},
        {id: 4, message: 'hello'},
    ] as Array<messageType>,
};

export type initialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: any): initialStateType => {
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

type addMessageActionCreatorType = {
    type: typeof ADD_MESSAGE
    newMessageBody: string
}

export const addMessageActionCreator = (newMessageBody: string): addMessageActionCreatorType => {
    return {
        type: ADD_MESSAGE,
        newMessageBody,
    };
};

export default dialogsReducer;
