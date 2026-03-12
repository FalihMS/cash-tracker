import Header from "@/components/header"
import { MainContent } from "@/components/main-content"
import BotTransactionForm from "@/features/transaction/components/bot-transaction-form"

export default async function Page() {


    return (
            <MainContent>
                <BotTransactionForm />
            </MainContent>
    )
}
