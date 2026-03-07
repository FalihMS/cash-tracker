import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrencyDisplay } from "@/lib/utils";

export async function BalanceCard({
    balance
}:{
    balance: number
}){
    return (
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
    )
}
