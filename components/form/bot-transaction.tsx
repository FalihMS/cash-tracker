"use client"

import { Field, FieldGroup, FieldLabel } from "../ui/field"
import { revalidateLogic, StandardSchemaV1Issue } from "@tanstack/react-form"
import { toast } from "sonner"
import z from "zod"
import { useAppForm } from "@/hooks/form"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupTextarea } from "../ui/input-group"
import { LoaderCircle, MicIcon, PaperclipIcon, SendIcon } from "lucide-react"
import { DevelopmentDialog } from "../dialog/development-dialog"

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
                    id="bot-form"
                    onSubmit={(e) => {
                        e.preventDefault()
                        form.handleSubmit()
                    }}
                >
                    <FieldGroup className="mb-5 gap-4">

                        <form.Field
                            name="chat"
                            children={(field) => {
                                return (
                                    <Field>
                                        <FieldLabel htmlFor={field.name}>Transaction Detail</FieldLabel>
                                        <InputGroup>
                                            <InputGroupTextarea
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                placeholder="Optional notes"
                                                rows={2}
                                                className="min-h-20 resize-none"
                                                aria-disabled={false}
                                            />
                                            <InputGroupAddon align="block-end" className="border-t flex justify-between">
                                                <DevelopmentDialog>
                                                    <InputGroupButton size="sm">
                                                        <PaperclipIcon />
                                                    </InputGroupButton>
                                                </DevelopmentDialog>
                                                 <form.Subscribe
                                                    selector={(s) => ({
                                                        chat: s.values.chat,
                                                        isSubmitting: s.isSubmitting,
                                                    })}
                                                >
                                                    {({ chat, isSubmitting }) => {
                                                        if (chat === "") return (
                                                            <DevelopmentDialog>
                                                                <InputGroupButton disabled={isSubmitting} variant={"default"} size="sm">
                                                                    <MicIcon />
                                                                </InputGroupButton>
                                                            </DevelopmentDialog>
                                                        )

                                                        return(
                                                            <InputGroupButton disabled={isSubmitting} variant={"default"} size="sm" type="submit" form={"bot-form"}>
                                                                {
                                                                    !isSubmitting ?  <SendIcon /> : <LoaderCircle className="animate-spin" />
                                                                }
                                                            </InputGroupButton>
                                                        )
                                                    }}
                                                </form.Subscribe>

                                            </InputGroupAddon>

                                        </InputGroup>
                                    </Field>
                                )
                            }

                            }
                        />
                    </FieldGroup>
                </form>
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
