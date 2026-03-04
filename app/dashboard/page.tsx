import { AppSidebar } from "@/components/app-sidebar"
import { ChartBarInteractive } from "@/components/chart/expense"
import { RecentTransactionTable } from "@/components/table/recent-transaction"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { createClient } from "@/lib/supabase/server"
import { formatCurrencyDisplay, startOfMonth, startOfNextMonth } from "@/lib/utils"

export default async function Page() {

  const supabase = await createClient()

  const user_id = (await supabase.auth.getUser()).data.user?.id

  const { data: transactionData } = await supabase.from("transactions").select().eq('type', 'expense').order('transaction_date', { ascending: false })

  const { data: totalBalance } = await supabase.from('balance').select('total:total_balance').eq('user_id', user_id).single()
  const { data: totalExpenseData } = await supabase.from('total_expense').select('total:sum').eq('user_id', user_id).single()
  // .eq('type', 'expense')
  // .gte('transaction_date', startOfMonth.toISOString())

  const { data: historyData } = await supabase.rpc('get_expense_sums_last_14_days', {
    p_user_id: user_id
  })

  const transactions: { transaction_date: string; category: string; type: string, amount: number; note: string }[] = []
  transactionData?.map((item) => transactions.push({
    transaction_date: item.transaction_date.substring(5, item.transaction_date.len),
    category: item.category,
    type: item.type,
    amount: item.amount,
    note: item.note
  }))

  console.log(totalBalance)

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }>
      <AppSidebar />
      <SidebarInset>
        <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-vertical:h-4 data-vertical:self-auto"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="w-full max-w-3xl pt-4 p-2 lg:mt-4 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardDescription>
                Total Balance
              </CardDescription>
            </CardHeader>
            <CardContent className="-mt-3">
              {
                totalBalance?.total > 0 ? (
                  <CardTitle className="text-2xl">
                    {formatCurrencyDisplay(totalBalance?.total)}
                  </CardTitle>
                ) : (
                  <CardTitle className="text-2xl text-red-500">
                    {formatCurrencyDisplay(totalBalance?.total)}
                  </CardTitle>

                )
              }
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>
                Total Expense
              </CardDescription>
              <CardAction>
                <Badge variant={'outline'}>
                  This Month
                </Badge>
              </CardAction>
            </CardHeader>
            <CardContent className="-mt-3">
              <CardTitle className="text-2xl">
                {formatCurrencyDisplay(totalExpenseData?.total)}
              </CardTitle>
            </CardContent>
          </Card>
          <ChartBarInteractive expense={historyData} />
          <RecentTransactionTable data={transactions} />
        </div>

      </SidebarInset>
    </SidebarProvider>
  )
}
