import z from "zod"

const NewTransactionSchema = z.object({
    date: z.string().min(1, "Date is required."),
    type: z.enum(["income", "expense"]),
    amount: z.number().min(1, "Amount must be Filled"),
    category: z.string().min(1, "Category Must be Selected."),
    notes: z.string(),
})

export { NewTransactionSchema }