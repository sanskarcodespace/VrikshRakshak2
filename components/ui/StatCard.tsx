import * as React from "react";
import { cn } from "@/lib/utils";

const StatCard = ({ title, value, change, icon: Icon, trend = "up" }: {
  title: string;
  value: string;
  change?: string;
  icon?: any;
  trend?: "up" | "down" | "neutral";
}) => {
  return (
    <div className="p-6 rounded-2xl bg-card border shadow-soft flex flex-col gap-2 hover:shadow-soft-lg transition-all active:scale-[0.98]">
      <div className="flex justify-between items-start">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        {Icon && <div className="p-2 rounded-xl bg-primary/10 text-primary"><Icon size={20} /></div>}
      </div>
      <div className="flex flex-col">
        <span className="text-3xl font-bold tracking-tight">{value}</span>
        {change && (
          <span className={cn(
            "text-xs font-medium mt-1",
            trend === "up" ? "text-emerald-500" : trend === "down" ? "text-rose-500" : "text-slate-500"
          )}>
            {change} {trend === "up" ? "↑" : trend === "down" ? "↓" : ""}
          </span>
        )}
      </div>
    </div>
  );
};

export { StatCard };
