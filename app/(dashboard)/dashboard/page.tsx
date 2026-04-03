"use client";

import { cn } from "@/lib/utils";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";
import { 
  TreePine, 
  Heart, 
  Skull, 
  AlertTriangle, 
  Calendar, 
  Plus, 
  Upload, 
  Bell, 
  Trophy,
  ChevronRight,
  TrendingUp,
  Activity,
  Zap
} from "lucide-react";
import { DashboardContainer } from "@/components/layout/DashboardContainer";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { AvatarGroup } from "@/components/ui/AvatarGroup";

const data = [
  { name: "Jan", growth: 40, health: 80 },
  { name: "Feb", growth: 45, health: 85 },
  { name: "Mar", growth: 55, health: 82 },
  { name: "Apr", growth: 60, health: 90 },
  { name: "May", growth: 75, health: 88 },
  { name: "Jun", growth: 80, health: 92 },
];

export default function DashboardPage() {
  return (
    <DashboardContainer>
      {/* Header with quick stats summarized */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-4">
        <div className="space-y-1">
          <Badge variant="outline" className="glass border-primary/20 text-primary mb-2">SYSTEM_SYNAPS_SYNC :: v4.2.1</Badge>
          <h1 className="text-4xl font-bold tracking-tighter">Command Centre</h1>
          <p className="text-muted-foreground font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-eco-green animate-pulse" /> 
            Global Neural Mesh Active: Monitoring 12,482 Lifeforms.
          </p>
        </div>
        <div className="flex items-center gap-3">
           <AvatarGroup avatars={[]} max={4} />
           <Button className="rounded-2xl shadow-glow gap-2 h-12 px-6">
              <Zap size={18} fill="currentColor" /> Initialize Scan
           </Button>
        </div>
      </div>

      {/* Modern KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: "Total Planted", value: "12,482", icon: TreePine, color: "text-primary", bg: "bg-primary/10", trend: "+24 today" },
          { label: "Survival Rate", value: "94.2%", icon: Heart, color: "text-rose-500", bg: "bg-rose-500/10", trend: "+0.4% month" },
          { label: "Dead Trees", value: "142", icon: Skull, color: "text-zinc-500", bg: "bg-zinc-500/10", trend: "-12 from avg" },
          { label: "Needs Attention", value: "28", icon: AlertTriangle, color: "text-amber-500", bg: "bg-amber-500/10", trend: "5 Critical" },
          { label: "Reminders", value: "12", icon: Calendar, color: "text-cyan-500", bg: "bg-cyan-500/10", trend: "3 Overdue" }
        ].map((kpi, i) => (
          <Card key={i} className="p-5 glass border-white/10 hover-scale group relative overflow-hidden flex flex-col justify-between h-40">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <kpi.icon size={64} />
            </div>
            <div className="flex items-center justify-between relative z-10">
              <div className={cn("p-2 rounded-xl", kpi.bg, kpi.color)}>
                <kpi.icon size={20} />
              </div>
              <Badge variant="outline" className="text-[10px] glass border-white/5">{kpi.trend}</Badge>
            </div>
            <div className="space-y-1 relative z-10">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">{kpi.label}</p>
              <h3 className="text-2xl font-bold tracking-tight">{kpi.value}</h3>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Chart Section */}
        <Card className="lg:col-span-8 p-8 glass border-white/10 space-y-6 min-h-[450px]">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-xl font-bold tracking-tight">Growth & Health Telemetry</h3>
              <p className="text-xs text-muted-foreground">Cumulative biomass increase vs. health index.</p>
            </div>
            <div className="flex gap-2">
               <Badge className="bg-primary/20 text-primary border-primary/20">Growth</Badge>
               <Badge className="bg-accent/20 text-accent border-accent/20">Health</Badge>
            </div>
          </div>
          
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.4)', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.4)', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{backgroundColor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px'}}
                  itemStyle={{fontSize: '12px', fontWeight: 'bold'}}
                />
                <Area type="monotone" dataKey="growth" stroke="var(--primary)" fillOpacity={1} fill="url(#colorGrowth)" strokeWidth={3} />
                <Line type="monotone" dataKey="health" stroke="var(--accent)" strokeWidth={3} dot={{r: 4, fill: 'var(--accent)'}} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Sidebar Panel: Quick Actions & Today's Reminders */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <Card className="p-6 glass border-white/10 space-y-6">
            <h3 className="text-lg font-bold tracking-tight border-b border-white/5 pb-4">Quick Action Protocols</h3>
            <div className="grid grid-cols-2 gap-3">
               {[
                 { label: "Register Tree", icon: Plus, color: "bg-primary/20 text-primary", href: "/trees/new" },
                 { label: "Sync Telemetry", icon: Upload, color: "bg-cyan-500/20 text-cyan-500", href: "#" },
                 { label: "Critical Alerts", icon: Bell, color: "bg-rose-500/20 text-rose-500", href: "/notifications" },
                 { label: "Community", icon: Trophy, color: "bg-eco-green/20 text-eco-green", href: "/leaderboard" }
               ].map((action, i) => (
                 <button key={i} className="flex flex-col items-center gap-3 p-4 rounded-2xl glass border-white/5 hover:border-primary/50 transition-all hover-scale group">
                    <div className={cn("p-3 rounded-xl transition-transform group-hover:scale-110", action.color)}>
                       <action.icon size={20} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{action.label}</span>
                 </button>
               ))}
            </div>
          </Card>

          <Card className="p-6 glass border-white/10 space-y-4 flex-1">
             <h3 className="text-lg font-bold tracking-tight border-b border-white/5 pb-4">Timeline_Today</h3>
             <div className="space-y-4">
                {[
                  { time: "09:00 AM", task: "Watering Sector_4A", type: "MAINTENANCE" },
                  { time: "11:30 AM", task: "Infestation Scan", type: "DIAGNOSTIC" },
                  { time: "02:00 PM", task: "Drone Payload Sync", type: "SYSTEM" },
                  { time: "04:45 PM", task: "Soil pH Analysis", type: "CHEMICAL" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group cursor-pointer hover:bg-white/5 p-2 rounded-xl transition-all">
                     <div className="text-[10px] font-bold text-muted-foreground pt-1">{item.time}</div>
                     <div className="space-y-1">
                        <p className="text-sm font-bold group-hover:text-primary transition-colors">{item.task}</p>
                        <Badge variant="outline" className="text-[8px] py-0 h-4 border-white/10 opacity-60">{item.type}</Badge>
                     </div>
                  </div>
                ))}
             </div>
             <Button variant="ghost" className="w-full h-10 rounded-xl text-xs gap-2 text-muted-foreground">
                View Full Timeline <ChevronRight size={14} />
             </Button>
          </Card>
        </div>
      </div>
    </DashboardContainer>
  );
}

