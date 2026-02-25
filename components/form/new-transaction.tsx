"use client"

import { getTodayISOString } from "@/lib/utils"
import { FieldGroup } from "../ui/field"
import { revalidateLogic, StandardSchemaV1Issue } from "@tanstack/react-form"
import { toast } from "sonner"
import z from "zod"
import { useAppForm } from "@/hooks/form"

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
  { label: "Housing", value: "housing" },
  { label: "Food & Groceries", value: "food_groceries" },
  { label: "Transportation", value: "transportation" },
  { label: "Utilities", value: "utilities" },
  { label: "Healthcare", value: "healthcare" },
  { label: "Entertainment & Leisure", value: "entertainment_leisure" },
  { label: "Savings & Investments", value: "savings_investments" },
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
        onSubmit: async ({ value }) => {
            toast.success("Transaction saved", {
                description: (
                    <pre className="text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md">
                        <code>{JSON.stringify(value, null, 2)}</code>
                    </pre>
                ),
                position: "top-right",
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
        <div className="w-full mt-2 px-4 md:px-8">
            <form
                className="grid lg:grid-cols-2"
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
                        name="amount"
                        children={(field) => <field.TextNumberField label="Amount" />}
                    />

                    <form.AppField
                        name="category"
                        children={(field) => <field.SelectField label={"Category"} options={categoryOptions} />}
                    />

                    <form.AppField
                        name="notes"
                        children={(field) => <field.TextareaField label="Notes" />}
                    />
                </FieldGroup>
            </form>
            <form.Subscribe selector={(s) => s.canSubmit}>
                {(canSubmit) => (
                    <Button type="submit" form="transaction-form" disabled={!canSubmit}>
                        Save Transaction
                    </Button>
                )}
            </form.Subscribe>
        </div>
    )
}

function getErrorForm(errors: Record<string, StandardSchemaV1Issue[]>) {
    const messages: string[] = []

    for (const key in errors) {
        messages.push(errors[key][0].message)
    }
    return messages
}