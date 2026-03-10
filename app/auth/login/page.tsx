'use client'
import { Card, CardContent } from "@/components/ui/card";
import { PiggyBank } from "lucide-react";

import { cn } from "@/lib/utils"
import {
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import z from "zod";
import { useAppForm } from "@/hooks/form";
import { revalidateLogic } from "@tanstack/react-form";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { getErrorForm } from "@/lib/form/get-error-form";


export default function Page() {
  return (
    <div className="w-full min-h-svh mt-10 flex flex-col items-center">
      <Card className="w-fit mb-10">
        <CardContent>
          <PiggyBank className="size-12" />
        </CardContent>
      </Card>
      <LoginForm />
    </div>
  )
}

const loginFormSchema = z.object({
  email: z.string().min(1, "Email is required."),
  password: z.string().min(1, "Password cannot be empty"),
})

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useRouter(); // Hook from your routing library
  const form = useAppForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onDynamic: loginFormSchema,
    },
    validationLogic: revalidateLogic({
      mode: 'submit',
      modeAfterSubmission: 'change',
    }),
    onSubmit: async ({ value, formApi }) => {
      const supabase = createClient()
      // 1. Wrap the actual logic in a promise for the toast to track

      const loginPromise = async () => {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: value.email,
          password: value.password,
        })

        if (error) {
          // 2. Map server errors to the form field
          formApi.setFieldMeta("password", (prev) => ({
            ...prev,
            errorMap: { onSubmit: "Invalid email or password" },
          }))

          // Throw to trigger the 'error' state in toast.promise
          throw new Error(error.message)
        }

        navigate.push("/main/dashboard");
        return data // Success!
      }

      // 3. Execute the toast and the logic together
      toast.promise(loginPromise(), {
        loading: "Signing you in...",
        success: "Welcome back!",
        error: (err) => err.message || "Login failed",
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
    <div className={cn("flex flex-col gap-6 w-sm px-4", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form.AppForm>
            <form
              className="flex flex-col gap-4"
              id="login-form"
              onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit()
              }}
            >
              <form.Field name={"email"}>
                {(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                      />
                    </Field>
                  )
                }}
              </form.Field>
              <form.Field name={"password"}>
                {(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <Input
                        type={"password"}
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                      />
                    </Field>
                  )
                }}
              </form.Field>
              <form.SubmitButtonField form={"login-form"} label="Login" />
               
            </form>
          </form.AppForm>
        </CardContent>
      </Card>
    </div>
  )
}
