"use client";

import { useState } from "react";
import { DashboardContainer } from "@/components/layout/DashboardContainer";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { 
  TreePine, 
  MapPin, 
  Calendar, 
  User, 
  Activity, 
  History, 
  Camera,
  ChevronLeft,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { AIAnalysisScanner } from "@/components/ai/AIAnalysisScanner";
import { HealthDiagnosticView } from "@/components/ai/HealthDiagnosticView";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

const historyData = [
  { name: "Week 1", health: 92 },
  { name: "Week 2", health: 88 },
  { name: "Week 3", health: 94 },
  { name: "Week 4", health: 85 },
  { name: "Week 5", health: 90 },
];

export default function SpecimenDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<"diagnostic" | "history">("diagnostic");
  const [aiResult, setAiResult] = useState<any>(null);

  const specimen = {
    id: params.id || "T-842",
    species: "Silver Birch",
    status: "Healthy",
    caretaker: "Felix Vance",
    location: "Sector 7-A (28.6, 77.2)",
    planted: "Feb 12, 2026",
  };

  return (
    <DashboardContainer>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <Link href="/trees">
              <Button variant="ghost" size="icon" className="rounded-xl glass border-white/5">
                <ChevronLeft size={24} />
              </Button>
            </Link>
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                 <h1 className="text-4xl font-bold tracking-tighter">Specimen_{specimen.id}</h1>
                 <Badge variant="success" className="h-6 px-3">ACTIVE</Badge>
              </div>
              <p className="text-muted-foreground font-medium flex items-center gap-2 uppercase tracking-widest text-[10px]">
                 <TreePine size={14} className="text-primary" /> {specimen.species} :: {specimen.location}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <Button variant="outline" className="rounded-2xl glass h-12 px-6">Edit Metadata</Button>
             <Button className="rounded-2xl shadow-glow h-12 px-6">Sync Telemetry</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Metadata Sidebar */}
          <div className="lg:col-span-4 space-y-6">
             <Card className="p-6 glass border-white/10 space-y-8">
                <div className="aspect-square rounded-3xl bg-accent/5 border border-white/5 overflow-hidden">
                   <img 
                    src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=800" 
                    alt={specimen.species} 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                   />
                </div>
                
                <div className="space-y-4">
                   {[
                     { label: "Caretaker", value: specimen.caretaker, icon: User },
                     { label: "Planted Date", value: specimen.planted, icon: Calendar },
                     { label: "GPS Anchor", value: specimen.location, icon: MapPin },
                     { label: "Current Status", value: specimen.status, icon: Activity }
                   ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between group">
                         <div className="flex items-center gap-3 text-muted-foreground">
                            <item.icon size={16} />
                            <span className="text-xs font-bold uppercase tracking-widest">{item.label}</span>
                         </div>
                         <span className="text-sm font-bold text-foreground">{item.value}</span>
                      </div>
                   ))}
                </div>
             </Card>

             <Card className="p-6 glass border-rose-500/10 bg-rose-500/5 space-y-4">
                <div className="flex items-center gap-3 text-rose-500">
                   <AlertCircle size={20} />
                   <h4 className="font-bold uppercase tracking-widest">System Warnings</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">No critical anomalies detected in the last 48 hours. Heartbeat stable.</p>
             </Card>
          </div>

          {/* AI Diagnostic Main Area */}
          <div className="lg:col-span-8 space-y-8">
             <div className="flex bg-white/5 rounded-2xl p-1 border border-white/5 w-fit">
                <button 
                  onClick={() => setActiveTab("diagnostic")}
                  className={`px-6 py-3 rounded-xl text-xs font-bold transition-all ${activeTab === "diagnostic" ? "bg-primary shadow-glow text-white" : "text-muted-foreground hover:text-white"}`}
                >AI_DIAGNOSTIC</button>
                <button 
                   onClick={() => setActiveTab("history")}
                   className={`px-6 py-3 rounded-xl text-xs font-bold transition-all ${activeTab === "history" ? "bg-primary shadow-glow text-white" : "text-muted-foreground hover:text-white"}`}
                >HEALTH_LAPSES</button>
             </div>

             {activeTab === "diagnostic" ? (
               <div className="space-y-8">
                  <AIAnalysisScanner onAnalysisComplete={(res) => setAiResult(res)} />
                  {aiResult && <HealthDiagnosticView result={aiResult} />}
               </div>
             ) : (
               <Card className="p-8 glass border-white/10 space-y-8 min-h-[500px]">
                  <div className="space-y-1">
                     <h3 className="text-2xl font-bold tracking-tight">Temporal Health History</h3>
                     <p className="text-muted-foreground text-sm">Longitudinal analysis of specimen biometrics over 5 weeks.</p>
                  </div>
                  <div className="h-[350px] w-full">
                     <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={historyData}>
                           <defs>
                              <linearGradient id="colorHealth" x1="0" y1="0" x2="0" y2="1">
                                 <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                                 <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                              </linearGradient>
                           </defs>
                           <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                           <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.4)', fontSize: 12}} />
                           <YAxis axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.4)', fontSize: 12}} domain={[0, 100]} />
                           <Tooltip 
                              contentStyle={{backgroundColor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px'}}
                           />
                           <Area type="monotone" dataKey="health" stroke="var(--primary)" fillOpacity={1} fill="url(#colorHealth)" strokeWidth={3} />
                        </AreaChart>
                     </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                     <div className="space-y-1">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Avg_Health</p>
                        <p className="text-2xl font-bold">89.8%</p>
                     </div>
                     <div className="space-y-1">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Growth_Rate</p>
                        <p className="text-2xl font-bold text-eco-green">+4.2%</p>
                     </div>
                     <div className="space-y-1">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Reliability</p>
                        <p className="text-2xl font-bold text-accent">99.4%</p>
                     </div>
                  </div>
               </Card>
             )}
          </div>
        </div>
      </div>
    </DashboardContainer>
  );
}
