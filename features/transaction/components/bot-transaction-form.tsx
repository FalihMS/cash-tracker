"use client"

import { useState } from "react"
import { revalidateLogic } from "@tanstack/react-form"
import { toast } from "sonner"

import { useAppForm } from "@/hooks/form"
import { Loader2 } from "lucide-react"
import { Transaction } from "@/features/transaction/schema/transaction"
import { BotTransactionFormSchema } from "@/features/transaction/schema/transaction-form"
import { botTransactionDefaultValue, expenseCategoryOptions, incomeCategoryOptions } from "@/features/transaction/default/transaction-options"
import { getErrorForm } from "@/lib/form/get-error-form"
import recognizedTransaction from "@/features/transaction/services/recognized-data"
import { FieldGroup } from "@/components/ui/field"
import { Card } from "@/components/ui/card"
import { RecognizedTransactionTable } from "./recognized-transaction"
import PrintError from "@/components/error/handle-invalid-form"

export default function BotTransactionForm() {
    const [recognizedTransactions, setRecognizedTransactions] = useState<Transaction[]>([])
    const [isProcessing, setIsProcessing] = useState(false)

    const form = useAppForm({
        defaultValues: botTransactionDefaultValue,
        validators: {
            onDynamic: BotTransactionFormSchema,
        },
        validationLogic: revalidateLogic({
            mode: 'submit',
            modeAfterSubmission: 'change',
        }),
        onSubmit: async ({ value, formApi }) => {
            setIsProcessing(true)
            try {
                // Process notes to recognize transactions
                const res = await recognizedTransaction(value.note, incomeCategoryOptions, expenseCategoryOptions)
                const { data } = await res.json()

                setRecognizedTransactions([{
                    category: data.category,
                    amount: data.amount,
                    type: data.type,
                    note: data.note,
                    transaction_date:
                        data.transaction_date ??
                        new Date().toISOString().split("T")[0],
                }])
            } catch (error) {
                toast.error("Processing failed", {
                    description: error instanceof Error ? error.message : "Failed to process transactions"
                })
            } finally {
                setIsProcessing(false)
            }
        },
        
        onSubmitInvalid: ({ formApi }) => {
            const errors = formApi.state.errors[0]
            if (!errors) return

            const errMessage = getErrorForm(errors)
            toast.error("Error Input", {
                description: (<PrintError errMessage={errMessage} />),
                position: "top-right",
            })
            return``
        },
    })

    if(isProcessing) return <LoadingHandler />
    
    if (recognizedTransactions.length > 0) return <RecognizedTransactionTable data={recognizedTransactions} />

    return (
        <form.AppForm>
            <div className="w-full mt-2 lg:mt-4 px-4 md:px-8 col-span-2">
                <form
                    className="grid max-w-xl w-full mx-auto"
                    id="transaction-form"
                    onSubmit={form.handleSubmit}
                >
                    <FieldGroup className="mb-5 gap-4">
                        <form.AppField
                            name="note"
                            children={(field) => <field.TextareaField label="Explain the Transaction" />}
                        />
                    </FieldGroup>
                    <form.SubmitButtonField form={"transaction-form"} label="Submit" />
                </form>

            </div>

        </form.AppForm>
    )
}

function LoadingHandler(){
    return (
        <div className="w-full h-full flex items-center justify-center">
            <Card className="w-full text-center flex flex-col items-center text-muted-foreground">
                <Loader2 className="animate-spin" />
                <span>Understanding Your Transaction</span>
            </Card>
        </div>
    )
}