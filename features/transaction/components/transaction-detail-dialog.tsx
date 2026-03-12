import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Eye } from "lucide-react"
import { Transaction } from "../schema/transaction"
import { formatCurrencyDisplay } from "@/lib/utils"

export function TransactionDetailDialog({
    transaction
}:{
    transaction: Transaction
}) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
            <Button size="icon" variant="outline">
                <Eye />
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Transaction Detail</DialogTitle>
          </DialogHeader>
          <div className="mt-2 flex flex-col justify-center divide-y">
            <div className="flex justify-between py-1.5">
                <span className="font-semibold">Date</span>
                <span className="">{transaction.transaction_date}</span>
            </div>
            <div className="flex justify-between py-1.5">
                <span className="font-semibold">Type</span>
                <span className="capitalize">{transaction.type}</span>
            </div>
            <div className="flex justify-between py-1.5">
                <span className="font-semibold">Amount</span>
                <span className=""> IDR {formatCurrencyDisplay(transaction.amount)}</span>
            </div>
            <div className="flex justify-between py-1.5">
                <span className="font-semibold">Category</span>
                <span className="">{transaction.category}</span>
            </div>

            <div className="flex justify-between py-1.5">
                <span className="font-semibold">Note</span>
                <span className="">{transaction.note}</span>
            </div>
          </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button className="w-full">Close</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
