'use client'

import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { DevelopmentDialog } from "../dialog/development-dialog"
import { formatCurrencyDisplay, shorten } from "@/lib/utils"
import { Eye } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { useIsMobile } from "@/hooks/use-mobile"
import { useRouter } from "next/navigation"

export function RecognizedTransactionTable({
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
    const isMobile = useIsMobile()
    const navigate = useRouter()
    return (
        <div className="w-full mt-2 lg:mt-4 px-4 md:px-8 col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle className="mx-2">Recognized Transaction</CardTitle>
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
                                                    <span className="sm:hidden text-sm font-light text-muted-foreground">
                                                        {!isMobile ? transaction.note : shorten(transaction.note)}
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
                <CardFooter>
                    <Button className="w-full" onClick={async () => {
                        await saveRecognizedTransaction(data[0])
                        navigate.push('/main/dashboard')
                    }}>
                        Record All Transaction
                    </Button>
                </CardFooter>
            </Card>
        </div>

    )
}


async function saveRecognizedTransaction(data: {
    transaction_date: string
    type: string
    category: string
    amount: number
    note: string
}) {
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()
    try {
        const { data: result, error } = await supabase
            .from('transactions')
            .insert({ ...data, user_id: session?.user.id })
            .select()

        if (error) throw new Error(error.message)

        toast.promise(
            Promise.resolve(result),
            {
                loading: "Saving transaction...",
                success: "Transaction saved!",
            }
        )

    } catch (error) {
        toast.error("Failed to save transaction", {
            description: error instanceof Error ? error.message : "Unknown error"
        })
    }

}