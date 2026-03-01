import { AppSidebar } from "@/components/app-sidebar"
import { ChartBarInteractive } from "@/components/chart/expense"
import { TableDemo } from "@/components/table/recent-transaction"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

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
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="w-full max-w-3xl pt-4 p-2 lg:mt-10 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardContent className="space-y-3">
              <CardDescription>
                Total Balance
              </CardDescription>
              <CardTitle className="text-2xl">
                1.000.000
              </CardTitle>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-3">
              <CardDescription>
                Total Expense
              </CardDescription>
              <CardTitle className="text-2xl">
                10.000.000
              </CardTitle>
            </CardContent>
          </Card>
          <ChartBarInteractive />
          <TableDemo />


        </div>

      </SidebarInset>
    </SidebarProvider>
  )
}
