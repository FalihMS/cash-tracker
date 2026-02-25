"use client"

import { FieldGroup } from "../ui/field"
import { revalidateLogic, StandardSchemaV1Issue } from "@tanstack/react-form"
import { toast } from "sonner"
import z from "zod"
import { useAppForm } from "@/hooks/form"

const formSchema = z.object({
    chat: z.string().min(1, "Explain the transaction"),
})

export default function BotTransactionForm() {
    const form = useAppForm({
        defaultValues: {
            chat: "",
        },
        validators: {
            onDynamic: formSchema,
        },
        validationLogic: revalidateLogic({
            mode: 'submit',
            modeAfterSubmission: 'change',
        }),
        onSubmit: async ({ value }) => {
            toast.success("Transaction Generated", {
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
        <form.AppForm>
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
                            name="chat"
                            children={(field) => <field.TextareaField label="Record Your Transaction" />}
                        />
                    </FieldGroup>
                </form>
                <form.SubmitButtonField label="Save" />
            </div>
        </form.AppForm>
    )
}

function getErrorForm(errors: Record<string, StandardSchemaV1Issue[]>) {
    const messages: string[] = []

    for (const key in errors) {
        messages.push(errors[key][0].message)
    }
    return messages
}
