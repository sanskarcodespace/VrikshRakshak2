"use client";

import { useState } from "react";
import { DashboardContainer } from "@/components/layout/DashboardContainer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { AnalyticsDashboard } from "@/components/analytics/AnalyticsDashboard";
import { TreeMap } from "@/components/maps/TreeMap";
import { 
  BarChart3, 
  Map as MapIcon, 
  Download, 
  Calendar, 
  RefreshCw,
  Zap,
  Globe
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AnalyticsPage() {
  const [activeView, setActiveView] = useState<"standard" | "geospatial">("standard");

  const mockTrees = [
    { lat: 28.6139, lng: 77.2090, health: 10 },
    { lat: 28.62, lng: 77.22, health: 40 },
    { lat: 28.63, lng: 77.21, health: 80 },
    { lat: 19.0760, lng: 72.8777, health: 20 },
    { lat: 19.08, lng: 72.88, health: 90 },
    { lat: 12.9716, lng: 77.5946, health: 15 },
    { lat: 13.00, lng: 77.60, health: 70 },
  ];

  return (
    <DashboardContainer>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
             <Badge variant="outline" className="glass border-primary/20 text-primary mb-2 uppercase tracking-widest text-[10px]">Strategic_Intelligence :: Level_5</Badge>
             <h2 className="text-3xl font-bold tracking-tight">Enterprise Analytics</h2>
             <p className="text-muted-foreground font-medium">Real-time global impact telemetry and environmental risk diagnostics.</p>
          </div>
          <div className="flex items-center gap-3">
             <Button variant="outline" className="rounded-2xl glass h-12 gap-2"><Calendar size={18} /> Last 30 Days</Button>
             <Button className="rounded-2xl shadow-glow h-12 gap-2"><Download size={18} /> Export Intel</Button>
          </div>
        </div>

        <div className="flex bg-white/5 rounded-2xl p-1 border border-white/5 w-fit">
           <button 
             onClick={() => setActiveView("standard")}
             className={cn("px-6 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2", activeView === "standard" ? "bg-primary shadow-glow text-white" : "text-muted-foreground hover:text-white")}
           >
              <BarChart3 size={16} /> DATA_TERMINAL
           </button>
           <button 
             onClick={() => setActiveView("geospatial")}
             className={cn("px-6 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2", activeView === "geospatial" ? "bg-primary shadow-glow text-white" : "text-muted-foreground hover:text-white")}
           >
              <MapIcon size={16} /> GEO_HEAT_ZONES
           </button>
        </div>

        {activeView === "standard" ? (
          <AnalyticsDashboard />
        ) : (
          <div className="space-y-6">
             <TreeMap trees={mockTrees} showHeat className="h-[600px]" />
             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: "Critical heat zones", value: "02", color: "text-rose-500" },
                  { label: "Stress containment", value: "94%", color: "text-eco-green" },
                  { label: "Satellite reliability", value: "99.8%", color: "text-accent" },
                  { label: "Impact score", value: "8.4k", color: "text-primary" }
                ].map((stat, i) => (
                  <Card key={i} className="p-6 glass border-white/5 space-y-1">
                     <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                     <p className={cn("text-2xl font-bold", stat.color)}>{stat.value}</p>
                  </Card>
                ))}
             </div>
          </div>
        )}

        <div className="p-8 glass border-white/10 rounded-3xl bg-primary/5 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="space-y-2 text-center md:text-left">
              <h4 className="text-xl font-bold">Predictive Reforestation Engine</h4>
              <p className="text-sm text-muted-foreground max-w-xl">Our AI suggests allocating <span className="text-white font-bold">14% more resources</span> to Sector 3-B based on accelerated thermal degradation trends.</p>
           </div>
           <Button className="rounded-2xl h-14 px-8 shadow-glow gap-3">
              <Zap size={20} /> INITIALIZE_ALLOCATION_PROTOCOL
           </Button>
        </div>
      </div>
    </DashboardContainer>
  );
}
