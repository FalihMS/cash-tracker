import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation";

import { AppSidebar } from "@/components/app-sidebar"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { Suspense } from "react";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default async function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (user == null) return redirect('/auth/login')

    return <MainLayoutComponent>{children}</MainLayoutComponent>
}

async function MainLayoutComponent({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarComponent>
            {children}
        </SidebarComponent>
    )
}

function SidebarComponent({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
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
                <Suspense fallback={<LoadingDashboard />}>
                    {children}
                </Suspense>
            </SidebarInset>
        </SidebarProvider>
    )
}

function LoadingDashboard(){
    return(
        <div className="w-full h-full flex items-center justify-center">
            <Card className="w-[400px] text-center flex flex-col items-center text-muted-foreground">
                <Loader2 className="animate-spin" />
                <span>Fetching from Database</span>
            </Card>
        </div>
    )
}