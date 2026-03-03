import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { DevelopmentDialog } from "../dialog/development-dialog"
import { formatCurrencyDisplay } from "@/lib/utils"

export function RecentTransactionTable({
    data
}: {
    data: {
        transaction_date: string
        type: string
        category: string
        amount: number
        note: string
    }[]
}) {
    return (
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Recent Transaction</CardTitle>
                <CardAction>
                    <DevelopmentDialog>
                        <Button variant={"outline"}>View All</Button>
                    </DevelopmentDialog>
                </CardAction>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[75px]">Date</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((transaction, id) => (
                            <TableRow key={id}>
                                <TableCell className="font-medium">{transaction.transaction_date}</TableCell>
                                <TableCell>{transaction.category} <span className="hidden md:inline-block font-light text-muted-foreground"> - {transaction.note}</span></TableCell>
                                <TableCell className="text-right">
                                    {
                                        transaction.type === 'income' ? <span className="text-green-500">IDR {formatCurrencyDisplay(transaction.amount)}</span> : <span className="text-red-500">IDR {formatCurrencyDisplay(transaction.amount)}</span>
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
