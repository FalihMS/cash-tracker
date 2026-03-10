
import Header from "@/components/header"
import { MainContent } from "@/components/main-content"
import NewTransactionForm from "@/features/transaction/components/new-transaction-form"

export default async function Page() {
    return (
        <>
            <Header>Record Transaction</Header>
            <MainContent>
                <NewTransactionForm />
            </MainContent>
        </>
    )
}
