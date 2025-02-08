export class addIncome {
    id?: number
    source: string
    amount: number
    category: string
    date: Date

    constructor() {
        this.id = 0;
        this.source = "";
        this.amount = 0;
        this.category = ""
        this.date = new Date()
    }
}

export interface GetIncome {
    id: number
    source: string
    amount: number
    category: string
    date: Date
}

export interface IApiResponseIncome {
    data: any
    message: string
    meta: any
    errors: string
    status: string
}