import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardDescription, CardAction, CardContent, CardTitle } from "@/components/ui/card";
import { formatCurrencyDisplay } from "@/lib/utils";

export default function DashboardScoreCard({
    totalExpense,
    balance
}:{
    totalExpense: number
    balance: number
}){
    return(
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                    {
                        totalExpense == 0 ? (
                            <CardTitle className="text-2xl">
                                IDR 0
                            </CardTitle>
                        ) : (
                            <CardTitle className="text-2xl">
                                IDR {formatCurrencyDisplay(totalExpense)}
                            </CardTitle>
                        )
                    }

                </CardContent>
            </Card>
            <Card>
            <CardHeader>
                <CardDescription>
                    Total Balance
                </CardDescription>
            </CardHeader>
            <CardContent className="-mt-3">
                {
                    balance == 0 && (
                        <CardTitle className="text-2xl">
                            IDR 0
                        </CardTitle>
                    ) 
                }
                {
                    balance > 0 && (
                         <CardTitle className="text-2xl">
                            IDR {formatCurrencyDisplay(balance)}
                        </CardTitle>
                    ) 
                }
                {
                    balance < 0 && (
                        <CardTitle className="text-2xl text-red-500">
                            (IDR {formatCurrencyDisplay(balance * -1)})
                        </CardTitle>
                    ) 
                }
            </CardContent>
        </Card>
        </div>
    )
}