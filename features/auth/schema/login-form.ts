import z from "zod"

export const LoginFormSchema = z.object({
    email: z.string().min(1, "Email is required."),
    password: z.string().min(1, "Password cannot be empty"),
})

export type LoginFormValues = z.infer<typeof LoginFormSchema>

