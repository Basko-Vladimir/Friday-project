
export type LoginResponseErrorType = {
    email: boolean
    emailRegExp: string
    error: string
    in: string
    password: boolean
    passwordRegExp: string
};

export type AuthMeResponseErrorType = {
    error: string
    in: string
}