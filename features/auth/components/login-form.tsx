'use client'

import { cn } from "@/lib/utils"
import {
    Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useAppForm } from "@/hooks/form";
import { revalidateLogic } from "@tanstack/react-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getErrorForm } from "@/lib/form/get-error-form";
import { LoginFormSchema } from "../schema/login-form"
import PrintError from "@/components/error/handle-invalid-form"
import handleLoginWithPassowrd from "../service/handle-login"

export function LoginPage(){
  return(
    <LoginCard>
      <LoginForm />
    </LoginCard>
  )
}

export function LoginCard({ 
  children 
}: Readonly<{
  children: React.ReactNode;
}>){
  return(
    <div className={"flex flex-col gap-6 w-sm px-4"}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          { children }
        </CardContent>
      </Card>
    </div>
  )
}

export function LoginForm() {
  const navigate = useRouter(); // Hook from your routing library
  const form = useAppForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onDynamic: LoginFormSchema,
    },
    validationLogic: revalidateLogic({
      mode: 'submit',
      modeAfterSubmission: 'change',
    }),
    onSubmit: async ({ value, formApi }) => {
      const loginPromise = async () => {
          try {
              const data = await handleLoginWithPassowrd(value)
              navigate.push("/main/dashboard")

              return data
          } catch (error: any) {
              formApi.setFieldMeta("password", (prev) => ({
                  ...prev,
                  errorMap: { onSubmit: "Invalid email or password" },
              }))

              throw error
          }
      }

      // 3. Execute the toast and the logic together
      toast.promise(loginPromise(), {
        loading: "Signing you in...",
        success: "Welcome back!",
        error: (err) => err.message || "Login failed",
      })
    },
    onSubmitInvalid: ({ formApi }) => {
      const errors = formApi.state.errors[0]
      if (!errors) return

      const errMessage = getErrorForm(errors)
      toast.error("Error Input", {
        description: (<PrintError errMessage={errMessage} />),
      })
      return
    },
  })
  return (
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
  )
}
