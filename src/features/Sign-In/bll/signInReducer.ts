

const initialState = {
    isLoading: false,
    a: 'bla-bla'
};

type StateType = typeof initialState;

export const signInReducer = (state: StateType = initialState, action: any): StateType => {
    switch (action.type) {
        default:
            return state;
    }
};
