import Header from "@/components/header";
import { MainContent } from "@/components/main-content";
import { RecentTransactionTable } from "@/components/table/recent-transaction";
import { BalanceCard } from "@/features/dashboard/components/balance-card";
import { TotalExpenseCard } from "@/features/dashboard/components/total-expense-card";
import { TransactionHistoryChart } from "@/features/dashboard/components/transaction-history-chart";
import { fetchDashboardData } from "@/features/dashboard/services/fetch-data";

export default async function DashboardPage(){
    const { 
        balanceData, 
        totalExpenseData, 
        recentTransactionData,
        transactionChartData,
    } = await fetchDashboardData()


    return(
        <>
            <Header>Dashboard</Header>
            <MainContent>
                <BalanceCard balance={balanceData} />
                <TotalExpenseCard totalExpense={totalExpenseData} />
                <TransactionHistoryChart data={transactionChartData} />
                <RecentTransactionTable data={recentTransactionData} />
            </MainContent>
        </>
    )
}


