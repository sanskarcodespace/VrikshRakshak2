"use client";

import * as React from "react";
import Link from "next/link";
import { 
  BarChart3, 
  TreePine, 
  LayoutDashboard, 
  Trophy, 
  Bell, 
  User, 
  Settings, 
  LogOut,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Trees", href: "/trees", icon: TreePine },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col h-full glass border-r w-64 transition-all duration-300", className)}>
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary-gradient rounded-xl flex items-center justify-center text-primary-foreground font-bold shadow-glow">
          VR
        </div>
        <span className="font-bold text-xl tracking-tight text-foreground">VrikshRakshak</span>
      </div>
      
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-accent/10 hover:text-accent transition-all group hover-scale"
          >
            <item.icon size={20} className="group-hover:text-accent transition-colors" />
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="p-6 border-t border-white/5">
        <Button variant="ghost" className="w-full justify-start gap-3 rounded-xl text-muted-foreground hover:bg-rose-500/10 hover:text-rose-500">
          <LogOut size={20} />
          Logout
        </Button>
      </div>
    </div>
  );
}

export function SidebarLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="flex h-screen bg-background overflow-hidden relative">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/60 backdrop-blur-md z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 transform lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <Sidebar />
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top Navbar */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-white/5 glass sticky top-0 z-30">
          <button 
            onClick={() => setIsOpen(true)}
            className="p-2 -ml-2 lg:hidden hover:bg-accent/10 rounded-xl"
          >
            <Menu size={24} />
          </button>
          
          <div className="flex-1 lg:pl-0 pl-4">
            <h1 className="text-lg font-bold tracking-tight text-foreground/80">CORE_SYSTEM::DASHBOARD</h1>
          </div>

          <div className="flex items-center gap-6">
            <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-xl hover:bg-accent/10 group">
              <Bell size={20} className="group-hover:text-accent transition-colors" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-accent rounded-full animate-pulse shadow-glow-cyan" />
            </Button>
            <div className="w-9 h-9 rounded-full border-2 border-accent/20 p-0.5 hover-scale cursor-pointer">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" className="rounded-full w-full h-full" />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-[1440px] mx-auto space-y-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
