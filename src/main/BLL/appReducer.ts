
const SET_MESSAGE_TEXT = 'cards/signInReducer/SET_MESSAGE_TEXT';

const initialState = {
    message: ''
};

export type StateType = typeof initialState;

export const appReducer = (state: StateType = initialState, action: SetMessageTextType): StateType => {
    switch (action.type) {
        case SET_MESSAGE_TEXT:
            return {
                ...state,
                message: action.messageText
            };
        default:
            return state;
    }
};

export type SetMessageTextType = ReturnType<typeof setMessageText>;
export const setMessageText = (messageText: string) => ({type: SET_MESSAGE_TEXT, messageText} as const);





