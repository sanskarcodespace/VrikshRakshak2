import * as React from "react";
import { cn } from "@/lib/utils";

export function DashboardContainer({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500", className)}>
      {children}
    </div>
  );
}

export function CardGridSystem({ children, columns = 3 }: { children: React.ReactNode; columns?: 1 | 2 | 3 | 4 }) {
  const cols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };
  
  return (
    <div className={cn("grid gap-6", cols[columns])}>
      {children}
    </div>
  );
}

export function AnalyticsWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        {children}
      </div>
      <aside className="space-y-8">
        {/* Sidebar/Contextual analytics elements */}
      </aside>
    </div>
  );
}
