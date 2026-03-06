"use client"

import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { BarChart2Icon, ListIcon, PiggyBankIcon, TagsIcon, WalletIcon } from "lucide-react"
import { SidebarFooterContent } from "./sidebar-footer"
import SidebarMainContent from "./sidebar-main"

// This is sample data.
const data = {
  main: [
    {
      title: "Dashboard",
      url: "/main/dashboard",
      icon: BarChart2Icon,
    },
    {
      title: "Transaction",
      url: "#",
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
    <Sidebar {...props}>
      <SidebarHeader className="h-16 flex flex-col justify-center">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="dashboard">
                <PiggyBankIcon className="!size-5" />
                <span className="text-sm text-base font-semibold">Cash Tracker Application</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarMainContent data={data.main} />
      <SidebarFooterContent user={{
        name: "User",
        email: "your-email@gmail.com",
        avatar: ""
      }} />
    </Sidebar>
  )
}
