'use client'

import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { DevelopmentDialog } from "../dialog/development-dialog"
import { formatCurrencyDisplay, shorten } from "@/lib/utils"
import { TransactionDetailDialog } from "@/features/transaction/components/transaction-detail-dialog"

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
        <Card>
            <CardHeader>
                <CardTitle>Recent Transaction</CardTitle>
                {data.length > 0 && (
                    <CardAction>
                        <Button variant={"outline"} asChild>
                            <a href="/main/transaction">
                                View All
                            </a>
                        </Button>
                    </CardAction>
                )}
            </CardHeader>
            <CardContent>
                {
                    data.length === 0 ? (
                        <p className="text-muted-foreground">
                            No Transaction Created Yet
                        </p>
                    ) : (
                        <Table>
                            <TableBody>
                                {data.map((transaction, id) => (
                                    <TableRow key={id} className="align-middle">

                                        {/* Category + Note */}
                                        <TableCell className="align-middle">
                                            <div className="flex flex-col">
                                                <span>{transaction.category}</span>
                                                <span className="sm:hidden text-sm font-light text-muted-foreground">
                                                    { shorten(transaction.note) }
                                                </span>
                                                <span className="hidden sm:block text-sm font-light text-muted-foreground">
                                                    { transaction.note }
                                                </span>
                                            </div>
                                        </TableCell>

                                        {/* Date + Amount */}
                                        <TableCell className="text-right align-middle">
                                            <div className="flex flex-col items-end">
                                                <span className="text-xs text-muted-foreground">
                                                    {transaction.transaction_date.substring(5).replaceAll("-", "/")}
                                                </span>

                                                <span
                                                    className={
                                                        transaction.type === "income"
                                                            ? "text-green-500 font-medium"
                                                            : "text-red-500 font-medium"
                                                    }
                                                >
                                                    IDR {formatCurrencyDisplay(transaction.amount)}
                                                </span>
                                            </div>
                                        </TableCell>

                                        {/* Action Button */}
                                        <TableCell className="text-end align-middle w-0">
                                            <TransactionDetailDialog transaction={transaction} />
                                        </TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )
                }
            </CardContent>
        </Card>
    )
}
