"use client"

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { IMenu } from "@/types"
import { DynamicIcon, IconName } from "lucide-react/dynamic"

export function NavMain({
    items,
}: {
    items: IMenu[]
}) {

    return (
        <SidebarGroup>
            <SidebarGroupLabel className="text-white">Application</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                                <a href={item.url}>
                                    <DynamicIcon name={item.icon as IconName} />
                                    <span>{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}
