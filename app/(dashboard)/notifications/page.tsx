"use client";

import { useState } from "react";
import { DashboardContainer } from "@/components/layout/DashboardContainer";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { 
  Bell, 
  Search, 
  Filter, 
  MoreVertical, 
  Calendar, 
  Clock, 
  Droplets, 
  AlertTriangle, 
  CheckCircle2, 
  History,
  Download
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function NotificationsPage() {
  const [filter, setFilter] = useState<"all" | "critical" | "warning">("all");

  const history = [
    { id: "1", type: "CRITICAL", title: "Hydration Alert", message: "Specimen T-845 (English Oak) has exceeded its 6-day watering threshold.", timestamp: "2026-04-03T12:00:00Z", category: "Hydration" },
    { id: "2", type: "WARNING", title: "Growth Anomaly", message: "T-843 showing 15% slower growth than localized average.", timestamp: "2026-04-03T11:00:00Z", category: "Diagnostics" },
    { id: "3", type: "SUCCESS", title: "Registration Confirmed", message: "Specimen T-842 successfully synchronized with neural grid.", timestamp: "2026-04-02T16:45:00Z", category: "System" },
    { id: "4", type: "INFO", title: "Sync Complete", message: "Satellite telemetry for Sector 7-A updated successfully.", timestamp: "2026-04-02T09:00:00Z", category: "Telemetry" },
    { id: "5", type: "CRITICAL", title: "Thermal Shock", message: "Sector 3-B ambient temperature peaked at 42°C. Vulnerable specimens flagged.", timestamp: "2026-04-01T14:30:00Z", category: "Environment" },
  ];

  const filteredHistory = history.filter(item => {
    if (filter === "all") return true;
    return item.type.toLowerCase() === filter;
  });

  return (
    <DashboardContainer>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
             <Badge variant="outline" className="glass border-accent/20 text-accent mb-2 uppercase tracking-widest text-[10px]">Security_Terminal :: logs_archive</Badge>
             <h2 className="text-3xl font-bold tracking-tight">Notification History</h2>
             <p className="text-muted-foreground font-medium">Historical record of all system-generated biological and environmental alerts.</p>
          </div>
          <div className="flex items-center gap-3">
             <Button variant="outline" className="rounded-2xl glass h-12 gap-2"><Download size={18} /> Export Logs</Button>
             <Button className="rounded-2xl shadow-glow h-12 px-6">Clear All Archive</Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
           <div className="flex bg-white/5 rounded-2xl p-1 border border-white/5 w-fit h-12">
              {[
                { label: "ALL_LOGS", value: "all" },
                { label: "CRITICAL", value: "critical" },
                { label: "WARNING", value: "warning" }
              ].map((tab) => (
                <button 
                  key={tab.value}
                  onClick={() => setFilter(tab.value as any)}
                  className={cn(
                    "px-6 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all", 
                    filter === tab.value ? "bg-primary shadow-glow text-white" : "text-muted-foreground hover:text-white"
                  )}
                >{tab.label}</button>
              ))}
           </div>
           <div className="relative flex-1">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
             <Input placeholder="Search logs by Specimen ID, Protocol, or Keyword..." className="pl-10 h-12 rounded-2xl glass" />
           </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
           {filteredHistory.map((item) => (
              <Card key={item.id} className="p-6 glass border-white/5 hover:border-white/10 transition-all flex flex-col md:flex-row md:items-center gap-6 group">
                 <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0",
                    item.type === "CRITICAL" ? "bg-rose-500/10 text-rose-500 shadow-glow-sm" :
                    item.type === "WARNING" ? "bg-amber-500/10 text-amber-500" :
                    item.type === "SUCCESS" ? "bg-eco-green/10 text-eco-green" : "bg-primary/10 text-primary"
                 )}>
                    {item.type === "CRITICAL" ? <Droplets size={24} /> : 
                     item.type === "WARNING" ? <AlertTriangle size={24} /> : 
                     item.type === "SUCCESS" ? <CheckCircle2 size={24} /> : <History size={24} />}
                 </div>

                 <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                       <h4 className="font-bold text-lg">{item.title}</h4>
                       <Badge variant="outline" className="text-[10px] uppercase font-bold py-0 h-5 border-white/10 bg-white/5 text-muted-foreground">
                          {item.category}
                       </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.message}</p>
                 </div>

                 <div className="md:border-l border-white/5 md:pl-8 space-y-2 shrink-0 md:min-w-[150px]">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                       <Calendar size={12} /> {new Date(item.timestamp).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                       <Clock size={12} /> {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                 </div>

                 <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical size={18} />
                 </Button>
              </Card>
           ))}
        </div>
      </div>
    </DashboardContainer>
  );
}
