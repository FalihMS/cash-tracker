import { createClient } from "@/lib/supabase/server"

export async function fetchDashboardData(){
    
    const supabase = await createClient()
    const user_id = (await supabase.auth.getUser()).data.user?.id

    const { data: balanceData, error: balanceError } = await supabase
        .from('balance')
        .select('total_balance')
        .eq('user_id', user_id)
        .single()

    const { data: totalExpenseData, error: totalExpenseError  } = await supabase
        .from('monthly_expenses')
        .select('total_expense')
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

    if(transactionError !== null) throw Error('Failed to fetch Transaction Data')
    if(totalExpenseError !== null) throw Error(JSON.stringify(totalExpenseError))
    if(balanceError !== null) throw Error('Failed to fetch Balance Data')

    return {
         balanceData: balanceData.total_balance, 
         totalExpenseData: totalExpenseData.total_expense,
         recentTransactionData: recentTransactionData,
         transactionChartData: transactionChartData,
     }
}
