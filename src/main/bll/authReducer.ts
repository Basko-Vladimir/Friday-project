

const initialState = {
    a: 'bla-bla'
};

type StateType = typeof initialState;

export const authReducer = (state: StateType = initialState, action: any): StateType => {
    switch (action.type) {
        default:
            return state;
    }
};
