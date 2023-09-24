export interface IUser{
    email: string
    name: string
}

export interface ICrendentials{
    user:IUser
    accessToken: string  // include Bearer ...
    refreshToken: string
}

export interface ITokens{
    accessToken: string  // include Bearer ...
    refreshToken: string
}