import { MainContent } from "@/components/main-content";
import { RecentTransactionTable } from "@/components/table/recent-transaction";
import DashboardScoreCard from "@/features/dashboard/components/score-card";
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
            <MainContent title="Dashboard">
                <DashboardScoreCard balance={balanceData} totalExpense={totalExpenseData} />
                <TransactionHistoryChart data={transactionChartData} />
                <RecentTransactionTable data={recentTransactionData} />
            </MainContent>
    )
}


