"use client"

import * as React from "react"
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { BarChart2Icon, ListIcon, PiggyBankIcon, PlusCircle, TagsIcon, WalletIcon } from "lucide-react"
import { SidebarFooterContent } from "./sidebar-footer"
import SidebarMainContent from "./sidebar-main"

// This is sample data.
const data = {
  quick: [
    {
      title: "New Transaction",
      url: "/main/new-transaction",
      icon: PlusCircle,
    },
  ],
  main: [
    {
      title: "Dashboard",
      url: "/main/dashboard",
      icon: BarChart2Icon,
    },
    {
      title: "Transaction",
      url: "/main/transaction",
      icon: ListIcon,
    },
    {
      title: "Account",
      url: "#",
      icon: WalletIcon,
    },
    {
      title: "Budget",
      url: "#",
      icon: TagsIcon,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible={'icon'} {...props}>
      <SidebarHeader className="flex flex-col justify-center">
        <SidebarMenu>
          <SidebarMenuItem className="w-full flex justify-between">
            <SidebarMenuButton
              className="group-data-[collapsible=icon]:hidden group-data-[collapsible=offcanvas]:hidden"
            >
                <PiggyBankIcon className="!size-5" />
                <span className="font-medium">Cash Tracker App</span>
            </SidebarMenuButton>
            <SidebarTrigger className="p-4" />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarMainContent quick={data.quick} main={data.main} />
      <SidebarFooterContent />
    </Sidebar>
  )
}
