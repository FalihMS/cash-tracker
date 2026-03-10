import BotTransactionForm from "@/components/form/bot-transaction"
import Header from "@/components/header"
import { MainContent } from "@/components/main-content"

export default async function Page() {


    return (
        <>
            <Header>Record Transaction</Header>
            <MainContent>
                <BotTransactionForm />
            </MainContent>
        </>
    )
}
