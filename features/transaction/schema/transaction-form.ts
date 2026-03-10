import z from "zod"

export const transactionFormSchema = z.object({
  transaction_date: z.string().min(1, "Date is required."),
  type: z.string().min(1, "Type Must be Selected."),
  amount: z.number().min(1, "Amount must be Filled"),
  category: z.string().min(1, "Category Must be Selected."),
  note: z.string(),
})

export type TransactionFormValues = z.infer<typeof transactionFormSchema>


export const BotTransactionFormSchema = z.object({
    note: z.string(),
})

export type BotTransactionFormValues = z.infer<typeof transactionFormSchema>

