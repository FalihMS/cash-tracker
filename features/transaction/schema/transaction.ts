export interface Transaction {
    transaction_date: string 
    type: string
    amount: number
    category: string
    note: string
    user_id?: string
}

export interface TransactionTypeOptions {
    label: string
    value: string
}

export type transactionType = "income" | "expense"