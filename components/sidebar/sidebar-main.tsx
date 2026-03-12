import { CirclePlusIcon, BotIcon, LucideProps } from "lucide-react";
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
                    <SidebarLinksMenu data={data} />
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>

    )
}

function SidebarQuickMenu() {
    return (
        <SidebarMenu>
            <SidebarMenuItem className="grid grid-cols-3 gap-2">
                <Button
                    asChild
                    className="col-span-2"
                >
                    <a href="new-transaction">
                        <CirclePlusIcon className="ml-0.5" />
                        <span>New Transaction</span>
                    </a>
                </Button>
                    <Button
                        asChild
                        variant="outline"
                    >
                        <a href="bot-transaction">

                            <BotIcon />
                            <span>Bot</span>
                        </a>
                    </Button>
            </SidebarMenuItem>
        </SidebarMenu>
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