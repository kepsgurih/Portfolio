import * as React from "react"
import { Egg } from "lucide-react"

import { NavMain } from "@/components/layout/nav-main"
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import { MenuConstant } from "@/constant/menu"
import pkg from '@/package.json'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar {...props}>
            <SidebarHeader className=" ">
                <SidebarMenu className=" ">
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <Egg className="size-4 animate animate-pulse" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold">Portfolio</span>
                                    <span className="">{pkg.version}</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className=" ">
                <NavMain items={MenuConstant} />
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}
