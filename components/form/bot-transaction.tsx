"use client"

import { useState } from "react"
import { FieldGroup } from "../ui/field"
import { revalidateLogic, StandardSchemaV1Issue } from "@tanstack/react-form"
import { toast } from "sonner"
import z from "zod"
import { useAppForm } from "@/hooks/form"
import { RecognizedTransactionTable } from "../table/recognized-transaction"
import { createClient } from "@/lib/supabase/client"
import { Card } from "../ui/card"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
    notes: z.string(),
})

export type RecognizedTransaction = {
    category: string
    amount: number
    type: string
    note: string
    transaction_date: string
}

export default function BotTransactionForm() {
    const [recognizedTransactions, setRecognizedTransactions] = useState<RecognizedTransaction[]>([])
    const [isProcessing, setIsProcessing] = useState(false)

    const form = useAppForm({
        defaultValues: {
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
            setIsProcessing(true)
            try {
                // Process notes to recognize transactions
                const supabase = createClient()
                const { data: { session } } = await supabase.auth.getSession()

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/anthropic-transaction-extractor`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${session?.access_token}`,
                            "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,   
                        },
                        body: JSON.stringify({
                            "expense_categories": [
                                "Housing",
                                "Food & Groceries",
                                "Transportation",
                                "Utilities",
                                "Entertainment",
                                "Other"
                            ],
                            "income_categories": [
                                "Salary",
                                "Freelance",
                                "Business",
                                "Investment Returns",
                                "Bonus",
                                "Other"
                            ],
                            "text": value.notes
                        }),
                    }
                )

                const { data } = await res.json()
                console.log(data)
                
                const recognized = {
                    category: data.category,
                    amount: data.amount,
                    type: data.type,
                    note:data.note,
                    transaction_date: data.transaction_date == null ? new Date().toISOString().split('T')[0] : data.transaction_date
                }
                
                console.log(recognized)
                setRecognizedTransactions([recognized])

            } catch (error) {
                toast.error("Processing failed", {
                    description: error instanceof Error ? error.message : "Failed to process transactions"
                })
            } finally {
                setIsProcessing(false)
            }
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


    if(isProcessing){
        return(
            <div className="w-full h-full flex items-center justify-center">
                <Card className="w-[400px] text-center flex flex-col items-center text-muted-foreground">
                    <Loader2 className="animate-spin" />
                    <span>Understanding Your Transaction</span>
                </Card>
            </div>
        )
    }

    if (recognizedTransactions.length > 0) {
        return <RecognizedTransactionTable data={recognizedTransactions} />
    }
    return (
        <form.AppForm>
            <div className="w-full mt-2 lg:mt-4 px-4 md:px-8 col-span-2">
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
                            name="notes"
                            children={(field) => <field.TextareaField label="Explain the Transaction" />}
                        />
                    </FieldGroup>
                    <form.SubmitButtonField form={"transaction-form"} label="Submit" />
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

