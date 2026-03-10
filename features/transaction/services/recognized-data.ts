import { createClient } from "@/lib/supabase/client"
import { TransactionTypeOptions } from "../schema/transaction"

export default async function recognizedTransaction(note: string, incomeType: TransactionTypeOptions[], expenseType: TransactionTypeOptions[]) {
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()
    return await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/anthropic-transaction-extractor`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session?.access_token}`,
                "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            },
            body: JSON.stringify({
                "expense_categories": incomeType,
                "income_categories": expenseType,
                "text": note
            }),
        }
    )
}