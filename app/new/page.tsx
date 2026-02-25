
import { AppSidebar } from "@/components/app-sidebar"
import NewTransactionForm from "@/components/form/new-transaction"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { DatePickerSimple } from "@/components/ui/date-picker"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupTextarea, InputGroupAddon, InputGroupText } from "@/components/ui/input-group"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { formatCurrencyDisplay, formatCurrencyValue, getTodayISOString } from "@/lib/utils"
import { revalidateLogic, StandardSchemaV1Issue, useForm } from "@tanstack/react-form"
import { toast } from "sonner"

import * as z from "zod"

export default function Page() {

   
    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }>
            <AppSidebar />
            <SidebarInset>
                <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-vertical:h-4 data-vertical:self-auto"
                    />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbPage>Record Transaction</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>

                {/* Main Content Section - Transaction Form */}
                <div className="flex flex-1 flex-col gap-4 p-4">
                    <NewTransactionForm />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
