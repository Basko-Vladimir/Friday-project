

export type UserDataType = {
    email: string
    name: string
    isAdmin: boolean
    rememberMe: boolean
    token: string
    tokenDeathTime: number
    __v: number
    _id: string
    success: boolean
};

export type ErrorType = {
    email: boolean
    emailRegExp: string
    error: string
    in: string
    password: boolean
    passwordRegExp: string
}