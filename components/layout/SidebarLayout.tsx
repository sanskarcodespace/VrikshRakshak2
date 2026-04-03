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

export function Sidebar({ 
  className, 
  isCollapsed, 
  onToggle 
}: { 
  className?: string; 
  isCollapsed?: boolean; 
  onToggle?: () => void 
}) {
  return (
    <div className={cn(
      "flex flex-col h-full glass border-r transition-all duration-300 relative", 
      isCollapsed ? "w-20" : "w-64",
      className
    )}>
      <div className={cn("p-6 flex items-center gap-3 overflow-hidden", isCollapsed && "px-4")}>
        <div className="w-10 h-10 min-w-[40px] bg-primary-gradient rounded-xl flex items-center justify-center text-primary-foreground font-bold shadow-glow">
          VR
        </div>
        {!isCollapsed && <span className="font-bold text-xl tracking-tight text-foreground whitespace-nowrap">VrikshRakshak</span>}
      </div>
      
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-accent/10 hover:text-accent transition-all group hover-scale",
              isCollapsed && "justify-center px-0"
            )}
            title={isCollapsed ? item.name : undefined}
          >
            <item.icon size={20} className="group-hover:text-accent transition-colors" />
            {!isCollapsed && <span className="whitespace-nowrap">{item.name}</span>}
          </Link>
        ))}
      </nav>

      {/* Collapse Toggle Desktop */}
      <button 
        onClick={onToggle}
        className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 bg-accent rounded-full border border-white/10 items-center justify-center shadow-glow text-white hover:scale-110 transition-all z-50"
      >
        <div className={cn("transition-transform duration-300", isCollapsed ? "rotate-0" : "rotate-180")}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </div>
      </button>

      <div className={cn("p-6 border-t border-white/5", isCollapsed && "px-4")}>
        <Button variant="ghost" className={cn("w-full justify-start gap-3 rounded-xl text-muted-foreground hover:bg-rose-500/10 hover:text-rose-500", isCollapsed && "px-0 justify-center")}>
          <LogOut size={20} />
          {!isCollapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
}

export function SidebarLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isCollapsed, setIsCollapsed] = React.useState(false);

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
        "fixed inset-y-0 left-0 z-50 transform lg:relative lg:translate-x-0 transition-all duration-300 ease-in-out font-inter",
        isOpen ? "translate-x-0" : "-translate-x-full",
        isCollapsed ? "lg:w-20" : "lg:w-64"
      )}>
        <Sidebar isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />
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
             <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] opacity-50">CORE_PROTOCOL</span>
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-glow" />
                <h1 className="text-sm font-bold tracking-widest text-foreground/80 uppercase">SYNAPS::TERMINAL</h1>
             </div>
          </div>

          <div className="flex items-center gap-6">
            <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-xl hover:bg-accent/10 group">
              <Bell size={20} className="group-hover:text-accent transition-colors" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-accent rounded-full animate-pulse shadow-glow" />
            </Button>
            <div className="w-9 h-9 rounded-full border-2 border-accent/20 p-0.5 hover-scale cursor-pointer overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 custom-scrollbar">
          <div className="max-w-[1600px] mx-auto space-y-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
