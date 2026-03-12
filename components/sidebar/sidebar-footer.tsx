"use client"

import * as React from "react"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarFooter,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { EllipsisVertical, LogOut, UserCircle } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export function SidebarFooterContent() {
    const navigate = useRouter(); // Hook from your routing library
    const supabase = createClient();

    const [user, setUser] = React.useState({
        avatar: "",
        name: "User",
        email: "Not signed in",
    })

    React.useEffect(() => {
        const fetchUser = async () => {
            const { data, error } = await supabase.auth.getUser()

            if (error) {
                console.error("Failed to fetch user info:", error)
                return
            }

            if (data?.user) {
                setUser({
                    avatar: (data.user.user_metadata as any)?.avatar ?? "",
                    name:
                        (data.user.user_metadata as any)?.full_name ||
                        data.user.email ||
                        "User",
                    email: data.user.email || "Unknown",
                })
            }
        }

        fetchUser()

        const { data: listener } = supabase.auth.onAuthStateChange(
            async (_, session) => {
                if (session?.user) {
                    setUser({
                        avatar: (session.user.user_metadata as any)?.avatar ?? "",
                        name:
                            (session.user.user_metadata as any)?.full_name ||
                            session.user.email?.substring ||
                            "User",
                        email: session.user.email || "Unknown",
                    })
                } else {
                    setUser({
                        avatar: "",
                        name: "User",
                        email: "Not signed in",
                    })
                }
            }
        )

        return () => {
            listener?.subscription.unsubscribe()
        }
    }, [supabase])

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error("Sign out error:", error);
            // optional: show UI toast error
            return;
        }

        navigate.push("/");
    };

    return (
        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton
                                size="lg"
                                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                            >
                                <Avatar className="h-8 w-8 rounded-lg grayscale">
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback className="rounded-lg"></AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">Hola,</span>
                                    <span className="truncate text-xs text-muted-foreground">
                                        {user.email}
                                    </span>
                                </div>
                                <EllipsisVertical className="ml-auto size-4" />
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                            side={"bottom"}
                            align="end"
                            sideOffset={4}
                        >
                            <DropdownMenuLabel className="p-0 font-normal">
                                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage src={user.avatar} alt={user.name} />
                                        <AvatarFallback className="rounded-lg"></AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-medium">{user.name}</span>
                                        <span className="truncate text-xs text-muted-foreground">
                                            {user.email}
                                        </span>
                                    </div>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <UserCircle />
                                    Account
                                </DropdownMenuItem>

                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleLogout}>
                                <LogOut />
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>

    )
}

//     const handleLogout = async () => {
//         const { error } = await supabase.auth.signOut();

//         if (error) {
//             console.error("Sign out error:", error);
//             // optional: show UI toast error
//             return;
//         }

//         navigate.push("/");
//     };

//     const user = {
//         avatar: "",
//         name: "",
//         email: ""
//     }
//     return (
//         <SidebarFooter>
//             <SidebarMenu>
//                 <SidebarMenuItem>
//                     <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                             <SidebarMenuButton
//                                 size="lg"
//                                 className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
//                             >
//                                 <Avatar className="h-8 w-8 rounded-lg grayscale">
//                                     <AvatarImage src={user.avatar} alt={user.name} />
//                                     <AvatarFallback className="rounded-lg"></AvatarFallback>
//                                 </Avatar>
//                                 <div className="grid flex-1 text-left text-sm leading-tight">
//                                     <span className="truncate font-medium">{user.name}</span>
//                                     <span className="truncate text-xs text-muted-foreground">
//                                         {user.email}
//                                     </span>
//                                 </div>
//                                 <EllipsisVertical className="ml-auto size-4" />
//                             </SidebarMenuButton>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent
//                             className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
//                             side={"bottom"}
//                             align="end"
//                             sideOffset={4}
//                         >
//                             <DropdownMenuLabel className="p-0 font-normal">
//                                 <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
//                                     <Avatar className="h-8 w-8 rounded-lg">
//                                         <AvatarImage src={user.avatar} alt={user.name} />
//                                         <AvatarFallback className="rounded-lg"></AvatarFallback>
//                                     </Avatar>
//                                     <div className="grid flex-1 text-left text-sm leading-tight">
//                                         <span className="truncate font-medium">{user.name}</span>
//                                         <span className="truncate text-xs text-muted-foreground">
//                                             {user.email}
//                                         </span>
//                                     </div>
//                                 </div>
//                             </DropdownMenuLabel>
//                             <DropdownMenuSeparator />
//                             <DropdownMenuGroup>
//                                 <DropdownMenuItem>
//                                     <UserCircle />
//                                     Account
//                                 </DropdownMenuItem>

//                             </DropdownMenuGroup>
//                             <DropdownMenuSeparator />
//                             <DropdownMenuItem onClick={handleLogout}>
//                                 <LogOut />
//                                 Log out
//                             </DropdownMenuItem>
//                         </DropdownMenuContent>
//                     </DropdownMenu>
//                 </SidebarMenuItem>
//             </SidebarMenu>
//         </SidebarFooter>

//     )
// }
