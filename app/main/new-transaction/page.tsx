import NewTransactionForm from "@/components/form/new-transaction"

import Header from "@/components/header"
import { MainContent } from "@/components/main-content"

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
