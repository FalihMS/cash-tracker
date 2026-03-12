"use client"

import { revalidateLogic } from "@tanstack/react-form"
import { toast } from "sonner"
import { useAppForm } from "@/hooks/form"
import recordTransaction from "@/features/transaction/services/record-data"

import { transactionFormSchema } from "@/features/transaction/schema/transaction-form"
import {
  typeOptions,
  expenseCategoryOptions,
  incomeCategoryOptions,
  transactionDefaultValue,
} from "@/features/transaction/default/transaction-options"
import { getErrorForm } from "@/lib/form/get-error-form"
import { FieldGroup } from "@/components/ui/field"
import PrintError from "@/components/error/handle-invalid-form"


export default function NewTransactionForm() {
    const form = useAppForm({
        defaultValues: transactionDefaultValue,
        validators: {
            onDynamic: transactionFormSchema,
        },
        validationLogic: revalidateLogic({
            mode: 'submit',
            modeAfterSubmission: 'change',
        }),
        onSubmit: async ({ value }) => {
            toast.promise(recordTransaction({ ...value }), {
                loading: "Recording Transactions..",
                success: "Transaction Recorded!",
                error: (err) => err.message || "Failed to Record Transaction",
            })
        },
        onSubmitInvalid: ({ formApi }) => {
            const errors = formApi.state.errors[0]
            if (!errors) return

            const errMessage = getErrorForm(errors)
            console.log(errMessage)
            toast.error("Error Input", {
                description: (<PrintError errMessage={errMessage} />),
                position: "top-right",
            })
        },
    })

    const getCategoryOptions = (type: string) => {
        return type === "expense" ? expenseCategoryOptions : incomeCategoryOptions;
    };

    return (
        <form.AppForm>
            <div className=" mt-2 lg:mt-4 px-4 md:px-0">
                <form
                    className="grid max-w-md w-full"
                    id="transaction-form"
                    onSubmit={(e) => {
                        e.preventDefault()
                        form.handleSubmit()
                    }}
                >
                    <FieldGroup className="mb-5 gap-4">
                        <form.AppField name="transaction_date">
                            {(field) => <field.DateField label={"Transaction Date"} />}
                        </form.AppField>

                        <form.AppField name="type">
                            {(field) => <field.RadioCardField label={"Select Type"} options={typeOptions} />}
                        </form.AppField>

                        <form.Subscribe
                            selector={(state) => state.values.type}
                        >
                            {(type) => (
                                <form.AppField name="category" >
                                    {(field) => (
                                        <field.SelectField
                                            label="Category"
                                            options={getCategoryOptions(type)}
                                        />
                                    )}
                                </form.AppField>
                            )}
                        </form.Subscribe>

                        <form.AppField name="amount">
                            {(field) => <field.TextNumberField label="Amount" />}
                        </form.AppField>
                        <form.AppField name="note">
                            {(field) => <field.TextareaField label="Notes" />}
                        </form.AppField>
                    </FieldGroup>
                    <form.SubmitButtonField form={"transaction-form"} label="Save" />
                </form>
            </div>
        </form.AppForm>
    )
}

