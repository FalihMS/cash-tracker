import { CirclePlusIcon, BotIcon, LucideProps, PlusCircle } from "lucide-react";
import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { Button } from "../ui/button";
import { ForwardRefExoticComponent } from "react";

export default function SidebarMainContent({
    data,
}: {
    data: {
        title: string
        url: string
        icon: ForwardRefExoticComponent<Omit<LucideProps, "ref">>
    }[]
}) {
    return (
        <SidebarContent>
            
            <SidebarGroup>
                <SidebarGroupContent className="flex flex-col gap-2">
                    <SidebarMenuItem className="my-1">
                    <SidebarMenuButton className="bg-foreground text-background hover:bg-muted-foreground hover:text-muted-background" asChild>
                        <a href="/main/new-transaction">
                           <PlusCircle />
                            <span>New Transaction</span>
                        </a>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                    <SidebarLinksMenu data={data} />
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>

    )
}


function SidebarLinksMenu({
    data,
}: {
    data: {
        title: string
        url: string
        icon: ForwardRefExoticComponent<Omit<LucideProps, "ref">>
    }[]
}) {
    return (
        <SidebarMenu>
            {data.map((item) => (
                <SidebarMenuItem key={item.title} className="my-1">
                    <SidebarMenuButton asChild>
                        <a href={item.url}>
                            {item.icon && <item.icon />}
                            <span>{item.title}</span>
                        </a>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    )
}