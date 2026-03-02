"use client"

import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { BarChart2Icon, BotIcon, CirclePlusIcon, ListIcon, PiggyBankIcon, TagsIcon, WalletIcon } from "lucide-react"
import { Button } from "./ui/button"
import { DevelopmentDialog } from "./dialog/development-dialog"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "#",
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
                <span className="text-base font-semibold">Cash Tracker</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a collapsible SidebarGroup for each parent. */}
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu>
              <SidebarMenuItem className="grid grid-cols-3 gap-2">
                <Button
                  asChild
                  className="col-span-2"
                >
                  <a href="new">
                    <CirclePlusIcon className="ml-0.5" />
                    <span>New Transaction</span>
                  </a>
                </Button>
                <DevelopmentDialog>
                  <Button
                    asChild
                    variant="outline"
                  >
                    <a href="#">

                      <BotIcon />
                      <span>Bot</span>
                    </a>
                  </Button>
                </DevelopmentDialog>
              </SidebarMenuItem>
            </SidebarMenu>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title} className="my-1">
                  <SidebarMenuButton>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
