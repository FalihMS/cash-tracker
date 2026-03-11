
import { createClient } from "@/lib/supabase/client";
import { LoginFormValues } from "../schema/login-form";

export default async function handleLoginWithPassowrd(value: LoginFormValues) {
    const supabase = createClient()

    const { data, error } = await supabase.auth.signInWithPassword({
          email: value.email,
          password: value.password,
        })

    if (error) {
        // Throw to trigger the 'error' state in toast.promise
        throw new Error(error.message)
    }
    return data // Success!
}
