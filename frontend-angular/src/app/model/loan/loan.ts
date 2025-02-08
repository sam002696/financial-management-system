export class addLoan {
    id?: number
    paidAmount?: number
    remainingAmount?: number
    status?: string
    userId?: number
    amount: number
    dueDate: Date

    constructor() {
        this.id = 0;
        this.amount = 0;
        this.dueDate = new Date()
    }
}

export interface GetLoan {
    id: number
    amount: number
    paidAmount: number
    remainingAmount: number
    dueDate: string
    status: string
    userId: number
}