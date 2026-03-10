import { createClient } from "@/lib/supabase/client";
import { Transaction } from "../schema/transaction";

export default async function recordTransaction(value: Transaction) {
    const { data, error } = await saveDB({ ...value })
    if (error) {
        // Throw to trigger the 'error' state in toast.promise
        throw new Error(error.message)
    }
    return data // Success!
}

async function saveDB(value: Transaction) {
    const supabase = createClient()
    const user_id = (await supabase.auth.getUser()).data.user?.id

    return await supabase.from('transactions').insert({
        transaction_date: value.transaction_date,
        type: value.type,
        amount: value.amount,
        category: value.category,
        note: value.note,
        user_id: user_id,
    }).select()
}