import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation";

import { AppSidebar } from "@/components/sidebar/app-sidebar"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
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
                <nav className="mt-2 ml-2 bg-gray-100">
                    <SidebarTrigger className="md:invisible p-4" />
                </nav>
                { children }
                
            </SidebarInset>
        </SidebarProvider>
    )
}
