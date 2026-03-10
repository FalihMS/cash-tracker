import { getTodayISOString } from "@/lib/utils"

export const typeOptions = [
  { label: "Expense", value: "expense" },
  { label: "Income", value: "income" },
]

export const expenseCategoryOptions = [
  { label: "Housing", value: "Housing" },
  { label: "Food & Groceries", value: "Food & Groceries" },
  { label: "Transportation", value: "Transportation" },
  { label: "Utilities", value: "Utilities" },
  { label: "Entertainment", value: "Entertainment" },
  { label: "Other Expense", value: "Other" },
]

export const incomeCategoryOptions = [
  { label: "Salary", value: "Salary" },
  { label: "Freelance", value: "Freelance" },
  { label: "Business", value: "Business" },
  { label: "Investment Returns", value: "Investment Returns" },
  { label: "Bonus", value: "Bonus" },
  { label: "Other Income", value: "Other" },
]

export const transactionDefaultValue = {
  transaction_date: getTodayISOString(),
  type: typeOptions[0].value,
  amount: 0,
  category: "",
  note: "",
}

export const botTransactionDefaultValue = {
  note: "",
}