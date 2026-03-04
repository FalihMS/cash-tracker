import { createClient } from "@/lib/supabase/server"

export async function fetchDashboardData(){
    
    const supabase = await createClient()
    const user_id = (await supabase.auth.getUser()).data.user?.id

    const { data: balanceData, error: balanceError } = await supabase
        .from('balance')
        .select('total:total_balance')
        .eq('user_id', user_id)
        .single()

    const { data: totalExpenseData, error: totalExpenseError  } = await supabase
        .from('total_expense')
        .select('total:sum')
        .eq('user_id', user_id).single()

    const { data: recentTransactionData, error: transactionError } = await supabase
        .from("transactions")
        .select()
        .eq('type', 'expense')
        .order('transaction_date', { ascending: false })
   
    const { data: transactionChartData } = await supabase
        .rpc('get_expense_sums_last_14_days', {
            p_user_id: user_id
        })

    if(transactionError || totalExpenseError || balanceError) throw Error('Failed to fetch data')

    return {
         balanceData: balanceData.total, 
         totalExpenseData: totalExpenseData.total,
         recentTransactionData: recentTransactionData,
         transactionChartData: transactionChartData,
     }
}
