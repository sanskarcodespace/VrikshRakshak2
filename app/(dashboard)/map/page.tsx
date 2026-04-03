"use client";

import { DashboardContainer } from "@/components/layout/DashboardContainer";
import { TreeMap } from "@/components/maps/TreeMap";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Search, Filter, Layers, Navigation2, Target } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { useState } from "react";

const mockTrees = [
  { id: "T-845", lat: 28.6139, lng: 77.2090, species: "English Oak", health: 82 },
  { id: "T-843", lat: 28.6145, lng: 77.2100, species: "Neem", health: 45 },
  { id: "T-842", lat: 28.6120, lng: 77.2080, species: "Banyan", health: 95 },
  { id: "T-840", lat: 28.6150, lng: 77.2110, species: "Peepal", health: 12 },
  { id: "T-839", lat: 28.6110, lng: 77.2070, species: "Teak", health: 88 },
];

export default function MapPage() {
  const [showHeat, setShowHeat] = useState(false);

  return (
    <div className="h-screen flex flex-col pt-20">
      <div className="px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 glass border-b border-white/10 z-20">
        <div className="flex items-center gap-4 w-full md:w-auto">
           <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input placeholder="Locate Specimen ID..." className="pl-10 h-10 rounded-xl glass bg-white/5 border-white/10" />
           </div>
           <Button variant="outline" size="icon" className="rounded-xl glass border-white/10 hover:border-primary/50 shrink-0">
              <Filter size={18} />
           </Button>
        </div>

        <div className="flex items-center gap-2">
           <Button 
              variant={showHeat ? "primary" : "outline"}
              onClick={() => setShowHeat(true)}
              className="rounded-xl glass h-10 px-4 gap-2 text-xs"
           >
              <Target size={16} /> HEALTH_HEATMAP
           </Button>
           <Button 
              variant={!showHeat ? "primary" : "outline"}
              onClick={() => setShowHeat(false)}
              className="rounded-xl glass h-10 px-4 gap-2 text-xs"
           >
              <Layers size={16} /> VECTOR_NODES
           </Button>
           <div className="h-8 w-[1px] bg-white/10 mx-2 hidden md:block" />
           <Button className="rounded-xl shadow-glow h-10 px-6 gap-2 text-xs">
              <Navigation2 size={16} className="fill-current" /> SYNC_FIELD_GRID
           </Button>
        </div>
      </div>

      <div className="flex-1 relative">
         <TreeMap 
            trees={mockTrees as any} 
            showHeat={showHeat}
            className="absolute inset-0 rounded-none border-none shadow-none" 
         />
         
         {/* Live Telemetry Overlay */}
         <div className="absolute top-6 right-6 z-10 w-64 space-y-4 pointer-events-none">
            <Card className="p-4 glass border-white/10 shadow-glow pointer-events-auto animate-reveal">
               <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Live_Grid_Status</p>
               <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                     <span>Signal Strength</span>
                     <span className="text-primary font-bold">98%</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                     <div className="w-[98%] h-full bg-primary" />
                  </div>
                  <div className="flex justify-between items-center text-xs pt-1">
                     <span>Node Latency</span>
                     <span className="text-eco-green font-bold">14ms</span>
                  </div>
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
}

// Minimal Card wrapper to avoid large imports
function Card({ children, className }: any) {
  return <div className={cn("rounded-2xl bg-card/30 backdrop-blur-md", className)}>{children}</div>;
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
