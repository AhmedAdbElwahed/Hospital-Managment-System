"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup,
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User, LogOut, Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const user = session?.user;

  return (
    <header className="h-16 border-b border-indigo-100/30 bg-white/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-30">
      <div className="flex items-center gap-6 flex-1">
        <SidebarTrigger className="hover:bg-indigo-50 text-indigo-600 transition-colors" />
        <div className="relative max-w-md w-full hidden lg:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search patients, medical records, doctors..."
            className="pl-10 h-10 bg-gray-50/50 border-gray-100 focus:bg-white focus:ring-indigo-500/20 transition-all rounded-xl"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-5">
        <Button variant="ghost" size="icon" className="relative hover:bg-indigo-50 text-gray-500 hover:text-indigo-600 transition-all rounded-full">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-rose-500 rounded-full border-2 border-white shadow-sm" />
        </Button>
        
        <div className="h-8 w-px bg-gray-100 mx-1" />

        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <div className="flex items-center gap-3 px-2 py-1.5 hover:bg-gray-50 rounded-xl cursor-pointer transition-all group">
              <div className="h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-100 group-hover:scale-105 transition-transform">
                <User className="h-5 w-5 text-white" />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-gray-900">{user?.name || "Dr. Ahmed Abd-Elwahed"}</p>
                <p className="text-[11px] font-medium text-gray-400 uppercase tracking-tight">{(user as any)?.role || "Chief Medical Officer"}</p>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 p-2 rounded-2xl shadow-2xl border-indigo-100/50">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">My Professional Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="my-1 opacity-50" />
              <DropdownMenuItem onClick={() => router.push("/profile")} className="rounded-lg h-10 px-3 hover:bg-indigo-50 group cursor-pointer">
                <User className="mr-3 h-4 w-4 text-gray-400 group-hover:text-indigo-600" />
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Medical Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOut()} className="rounded-lg h-10 px-3 hover:bg-rose-50 group cursor-pointer">
                <LogOut className="mr-3 h-4 w-4 text-gray-400 group-hover:text-rose-600" />
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">System Logout</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
