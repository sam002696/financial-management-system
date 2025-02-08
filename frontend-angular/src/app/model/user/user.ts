export interface User {
    id: number
    username: string
    email: string
    role: string
    accessToken: string
    refreshToken: any
    expirationTime: string
}

export interface UserProfileInfo {
    id: number
    name: string
    email: string
    balance: number
}


export class UpdateUserProfile {
    id?: number
    name: string
    email: string
    balance: number

    constructor() {

        this.name = "";
        this.email = "";
        this.balance = 0
    }
}