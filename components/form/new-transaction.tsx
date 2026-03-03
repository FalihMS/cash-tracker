"use client"

import { getTodayISOString } from "@/lib/utils"
import { FieldGroup } from "../ui/field"
import { revalidateLogic, StandardSchemaV1Issue } from "@tanstack/react-form"
import { toast } from "sonner"
import z from "zod"
import { useAppForm } from "@/hooks/form"
import { createClient } from "@/lib/supabase/client"

const formSchema = z.object({
    date: z.string().min(1, "Date is required."),
    type: z.string().min(1, "Type Must be Selected."),
    amount: z.number().min(1, "Amount must be Filled"),
    category: z.string().min(1, "Category Must be Selected."),
    notes: z.string(),
})

const typeOptions: { label: string, value: string }[]= [
    { label: "Expense", value: "expense" },
    { label: "Income", value: "income" },
]

const categoryOptions: { label: string; value: string }[] = [
  { label: "Housing", value: "Housing" },
  { label: "Food & Groceries", value: "Food & Groceries" },
  { label: "Transportation", value: "Transportation" },
  { label: "Utilities", value: "Utilities" },
  { label: "Healthcare", value: "Healthcare" },
  { label: "Entertainment", value: "Entertainment" },
];

export default function NewTransactionForm() {
    const form = useAppForm({
        defaultValues: {
            date: getTodayISOString(),
            type: typeOptions[0].value,
            amount: 0,
            category: "",
            notes: "",
        },
        validators: {
            onDynamic: formSchema,
        },
        validationLogic: revalidateLogic({
            mode: 'submit',
            modeAfterSubmission: 'change',
        }),
        onSubmit: async ({ value, formApi }) => {
              const supabase = createClient()
              // 1. Wrap the actual logic in a promise for the toast to track
            const user_id = (await supabase.auth.getUser()).data.user?.id
            const loginPromise = async () => {
                const { data, error } = await supabase.from('transactions').insert({
                    transaction_date: value.date,
                    type: value.type,
                    amount: value.amount,
                    category: value.category,
                    note: value.notes,
                    user_id: user_id,
                }).select()

                if (error) {
                  // Throw to trigger the 'error' state in toast.promise
                  throw new Error(error.message)
                }
        
                return data // Success!
              }
        
              // 3. Execute the toast and the logic together
              toast.promise(loginPromise(), {
                loading: "Recording Transactions..",
                success: "Transaction Recorded!",
                error: (err) => err.message || "Failed to Record Transaction",
              })
        
            },
        onSubmitInvalid: ({ formApi }) => {
            console.log(formApi.state.errors)
            console.log(formApi.state.isValid)

            const errors = formApi.state.errors[0]
            if (!errors) return

            const errMessage = getErrorForm(errors)
            console.log(errMessage)
            toast.error("Error Input", {
                description: (
                    <ul className="list-disc pl-4">
                        {errMessage.map((err, i) => (
                            <li key={i}>{err}</li>
                        ))}
                    </ul>
                ),
                position: "top-right",
            })
            return
        },
    })

    return (
        <form.AppForm>
            <div className="w-full mt-2 lg:mt-4 px-4 md:px-8">
                <form
                    className="grid max-w-xl w-full mx-auto"
                    id="transaction-form"
                    onSubmit={(e) => {
                        e.preventDefault()
                        form.handleSubmit()
                    }}
                >
                    <FieldGroup className="mb-5 gap-4">
                        <form.AppField
                            name="date"
                            children={(field) => <field.DateField label={"Transaction Date"} />}
                        />

                        <form.AppField 
                            name="type" 
                            children={(field) => <field.RadioCardField label={"Select Type"} options={typeOptions} />} 
                        />
                        <form.AppField
                            name="category"
                            children={(field) => <field.SelectField label={"Category"} options={categoryOptions} />}
                        />
                        <form.AppField
                            name="amount"
                            children={(field) => <field.TextNumberField label="Amount" />}
                        />
                        <form.AppField
                            name="notes"
                            children={(field) => <field.TextareaField label="Notes" />}
                        />


                    </FieldGroup>
                    <form.SubmitButtonField form={"transaction-form"} label="Save" />
                </form>

            </div>
        </form.AppForm>
    )
}

export function getErrorForm(errors: Record<string, StandardSchemaV1Issue[]>) {
    const messages: string[] = []

    for (const key in errors) {
        messages.push(errors[key][0].message)
    }
    return messages
}
