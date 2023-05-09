import {ActionsTypesInfer} from "./redux-store";

const ADD_MESSAGE = 'ADD-MESSAGE';

export type dialogType = {
    id: number
    name: string
}
export type messageType = {
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

type actionsType = ActionsTypesInfer<typeof messagesActions>;

const dialogsReducer = (state = initialState, action: actionsType): initialStateType => {
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

export const messagesActions = {
    addMessage: (newMessageBody: string) => {
        return {type: ADD_MESSAGE, newMessageBody} as const
    }
}

export default dialogsReducer;
