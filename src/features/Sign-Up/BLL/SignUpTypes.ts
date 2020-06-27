






export const SIGN_UP_SUCCESS = 'SignUpReducer/SIGN_UP_SUCCESS';
export const SIGN_UP_ERROR = 'SignUpReducer/SIGN_UP_ERROR';
export const IS_LOADING = 'SignUpReducer/IS_LOADING';


export type SignUpSuccessType = {
    type: typeof SIGN_UP_SUCCESS
    registeredSuccess: boolean
}
export type SignUpErrorType = {
    type: typeof SIGN_UP_ERROR
    errorMessage: string
}
export type IsLoadingACType = {
    type: typeof IS_LOADING
    value: boolean
}




export type ChatActionTypes = SignUpSuccessType | SignUpErrorType | IsLoadingACType