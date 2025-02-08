export interface Contract {
    id: number
    contractType: string
    terms: string
    status: string
    startDate: string
    dueDate: any
    paidAmount: any
    remainingAmount: any
    user: UserContract
}

export interface UserContract {
    id: number
    name: string
    email: string
    balance: number
}