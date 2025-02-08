export class addExpense {
    id?: number
    userId?: number
    amount: number
    category: string
    date: Date

    constructor() {
        this.id = 0;
        this.userId = 0;
        this.amount = 0;
        this.category = ""
        this.date = new Date()
    }
}

export interface GetExpense {
    id: number
    amount: number
    category: string
    date: Date
    userId: number
}