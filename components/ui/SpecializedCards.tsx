import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export function GraphCard({ 
  title, 
  description, 
  className,
  children 
}: { 
  title: string; 
  description?: string; 
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </CardHeader>
      <CardContent className="h-[300px] flex items-center justify-center bg-accent/50 m-6 mt-0 rounded-xl border border-dashed border-primary/20">
        {children || <div className="text-muted-foreground italic">Graph Visualization Placeholder</div>}
      </CardContent>
    </Card>
  );
}

export function NotificationCard({ title, time, type = "info" }: { title: string; time: string; type?: "info" | "success" | "warning" }) {
  return (
    <div className="flex gap-4 p-4 hover:bg-accent/50 transition-colors rounded-2xl border bg-card shadow-soft">
      <div className={cn(
        "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
        type === "success" ? "bg-emerald-100 text-emerald-600" : 
        type === "warning" ? "bg-amber-100 text-amber-600" : "bg-blue-100 text-blue-600"
      )}>
        <div className="w-2 h-2 rounded-full bg-current" />
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-medium leading-tight">{title}</h4>
        <p className="text-xs text-muted-foreground mt-1">{time}</p>
      </div>
    </div>
  );
}

export function LeaderboardCard({ players }: { players: any[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Protectors</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {players.map((player, i) => (
          <div key={i} className="flex items-center gap-4">
            <span className="font-bold text-muted-foreground w-4">{i + 1}</span>
            <div className="w-8 h-8 rounded-full bg-accent" />
            <div className="flex-1">
              <p className="text-sm font-medium">{player.name}</p>
              <p className="text-xs text-muted-foreground">{player.trees} trees saved</p>
            </div>
            <span className="text-sm font-bold text-primary">{player.points} pts</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function MapCard({ className }: { className?: string }) {
  return (
    <Card className={cn("overflow-hidden h-[400px] relative", className)}>
      <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto text-primary animate-pulse">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
          <p className="font-medium">Interactive Forest Map</p>
          <p className="text-xs text-muted-foreground">Click to explore monitored zones</p>
        </div>
      </div>
      <div className="absolute bottom-4 right-4 bg-card/80 backdrop-blur p-2 rounded-xl border flex gap-2">
        <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-xs">+</Button>
        <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-xs">-</Button>
      </div>
    </Card>
  );
}
