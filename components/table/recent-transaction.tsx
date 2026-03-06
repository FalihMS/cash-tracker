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
import { ChevronDownCircle, Edit, Eye } from "lucide-react"

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
                {data.length > 0 && (
                    <CardAction>
                        <DevelopmentDialog>
                            <Button variant={"outline"}>View All</Button>
                        </DevelopmentDialog>
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

                                        {/* On Going Development (aligned with the category) */}
                                        {/* <TableCell className="align-middle w-0">
                                            <ChevronDownCircle />
                                        </TableCell> */}

                                        {/* Category + Note */}
                                        <TableCell className="align-middle">
                                            <div className="flex flex-col">
                                                <span>{transaction.category}</span>
                                                <span className="text-sm font-light text-muted-foreground">
                                                    {transaction.note}
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
                                            <DevelopmentDialog>
                                                <Button size="icon" variant="outline">
                                                    <Eye />
                                                </Button>
                                            </DevelopmentDialog>
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
