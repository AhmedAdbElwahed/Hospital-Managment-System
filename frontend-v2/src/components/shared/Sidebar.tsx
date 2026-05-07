"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarRail
} from "@/components/ui/sidebar";
import { SIDEBAR_LINKS } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import { Activity } from "lucide-react";

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="border-r border-indigo-100/50">
      <SidebarHeader className="h-20 flex items-center justify-center group-data-[collapsible=icon]:px-0 px-6 mb-2">
        <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-105 active:scale-95 group-data-[collapsible=icon]:justify-center">
          <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-200 shrink-0">
            <Activity className="h-6 w-6 text-white" />
          </div>
          <span className="font-bold text-2xl tracking-tight text-gray-900 group-data-[collapsible=icon]:hidden">
            Medica<span className="text-indigo-600">.</span>
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden text-gray-400 font-semibold uppercase text-[10px] tracking-widest mb-2 px-4">
            Main Dashboard
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2 px-2 group-data-[collapsible=icon]:px-0">
              {SIDEBAR_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <SidebarMenuItem key={link.href} className="flex justify-center">
                    <SidebarMenuButton 
                      isActive={isActive} 
                      tooltip={link.title}
                      className={cn(
                        "h-12 w-full transition-all duration-200",
                        "group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:justify-center",
                        isActive 
                          ? "bg-indigo-600/10 text-indigo-600 hover:bg-indigo-600/15" 
                          : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                      )}
                      render={
                        <Link 
                          href={link.href}
                        />
                      }
                    >
                      <link.icon className={cn(
                        "h-5 w-5 shrink-0 transition-colors", 
                        isActive ? "text-indigo-600" : "text-gray-400 group-hover:text-gray-600"
                      )} />
                      <span className="font-medium group-data-[collapsible=icon]:hidden truncate ml-3">{link.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
