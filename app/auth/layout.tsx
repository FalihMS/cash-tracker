import { createClient } from "@/lib/supabase/client"

export default async function RouteAuth({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    // const supabase = createClient()
    // const { data: { user } } = await supabase.auth.getUser()

    // console.log(user)
    return(
        <>
            {children}
        </>
    )
}