import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrencyDisplay } from "@/lib/utils";

export async function TotalExpenseCard({
    totalExpense
}: {
    totalExpense: number
}) {
    return (
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
    )
}
