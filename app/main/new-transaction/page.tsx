
import { MainContent } from "@/components/main-content"
import NewTransactionForm from "@/features/transaction/components/new-transaction-form"

export default async function Page() {
    return (
            <MainContent title="New Transaction">
                <NewTransactionForm />
            </MainContent>
    )
}
