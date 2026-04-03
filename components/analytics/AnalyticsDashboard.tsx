"use client";

import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { TrendingUp, AlertTriangle, Users, Target, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGsapReveal } from "@/hooks/useGsap";
import { MortalityAnalytics } from "./MortalityAnalytics";

const survivalData = [
  { month: "Jan", rate: 85, predicted: 82 },
  { month: "Feb", rate: 88, predicted: 84 },
  { month: "Mar", rate: 92, predicted: 86 },
  { month: "Apr", rate: 89, predicted: 88 },
  { month: "May", rate: 91, predicted: 90 },
];

const speciesData = [
  { subject: 'Birch', A: 120, B: 110, fullMark: 150 },
  { subject: 'Oak', A: 98, B: 130, fullMark: 150 },
  { subject: 'Pine', A: 86, B: 130, fullMark: 150 },
  { subject: 'Neem', A: 99, B: 100, fullMark: 150 },
  { subject: 'Banyan', A: 85, B: 90, fullMark: 150 },
];

const growthData = [
  { name: 'W1', growth: 4.2 },
  { name: 'W2', growth: 3.8 },
  { name: 'W3', growth: 5.1 },
  { name: 'W4', growth: 4.7 },
  { name: 'W5', growth: 6.2 },
];

const activityData = [
  { name: 'Mon', active: 400 },
  { name: 'Tue', active: 300 },
  { name: 'Wed', active: 600 },
  { name: 'Thu', active: 800 },
  { name: 'Fri', active: 500 },
  { name: 'Sat', active: 900 },
  { name: 'Sun', active: 1000 },
];

const COLORS = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

export function AnalyticsDashboard() {
  const containerRef = useGsapReveal();

  return (
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Survival Trend */}
      <Card className="p-8 lg:col-span-2 glass border-white/10 space-y-6 animate-reveal">
        <div className="flex justify-between items-start">
           <div className="space-y-1">
              <Badge variant="outline" className="glass border-primary/20 text-primary">STRATEGIC_TELEMETRY</Badge>
              <h3 className="text-2xl font-bold tracking-tight">Survival Reliability Index</h3>
           </div>
           <div className="text-right">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Global_Rate</p>
              <p className="text-2xl font-bold text-eco-green">91.4%</p>
           </div>
        </div>
        <div className="h-[300px] w-full">
           <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={survivalData}>
                 <defs>
                    <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                       <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                 <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.4)', fontSize: 12}} />
                 <YAxis axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.4)', fontSize: 12}} />
                 <Tooltip contentStyle={{backgroundColor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px'}} />
                 <Area type="monotone" dataKey="rate" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorRate)" strokeWidth={4} />
                 <Line type="monotone" dataKey="predicted" stroke="rgba(255,255,255,0.2)" strokeDasharray="5 5" />
              </AreaChart>
           </ResponsiveContainer>
        </div>
      </Card>

      {/* Species Performance */}
      <Card className="p-8 glass border-white/10 space-y-6 animate-reveal">
        <div className="space-y-1">
           <Badge variant="outline" className="glass border-accent/20 text-accent">BIOLOGICAL_STATS</Badge>
           <h3 className="text-2xl font-bold tracking-tight">Species Adaptability</h3>
        </div>
        <div className="h-[300px] w-full">
           <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={speciesData}>
                 <PolarGrid stroke="rgba(255,255,255,0.05)" />
                 <PolarAngleAxis dataKey="subject" tick={{fill: 'rgba(255,255,255,0.4)', fontSize: 10}} />
                 <Radar name="Actual" dataKey="A" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.5} />
                 <Radar name="Target" dataKey="B" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
              </RadarChart>
           </ResponsiveContainer>
        </div>
      </Card>

      {/* Weekly Growth */}
      <Card className="p-8 glass border-white/10 space-y-6">
        <div className="space-y-1">
           <Badge variant="outline" className="glass border-eco-green/20 text-eco-green">KINETIC_GROWTH</Badge>
           <h3 className="text-2xl font-bold tracking-tight">Velocity Metrics</h3>
        </div>
        <div className="h-[200px] w-full">
           <ResponsiveContainer width="100%" height="100%">
              <BarChart data={growthData}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.4)', fontSize: 12}} />
                 <Bar dataKey="growth" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
           </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-eco-green/5 border border-eco-green/10">
           <TrendingUp className="text-eco-green" size={24} />
           <p className="text-xs font-medium leading-tight text-muted-foreground">Average weekly biometric expansion increased by <span className="text-white font-bold">12.4%</span> across all sectors.</p>
        </div>
      </Card>

      {/* Volunteer Activity */}
      <Card className="p-8 glass border-white/10 space-y-6 lg:col-span-1">
        <div className="space-y-1">
           <Badge variant="outline" className="glass border-primary/20 text-primary">COMMUNITY_DRIVE</Badge>
           <h3 className="text-2xl font-bold tracking-tight">Volunteer Momentum</h3>
        </div>
        <div className="h-[200px] w-full">
           <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData}>
                 <Area type="step" dataKey="active" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.1} strokeWidth={2} />
              </AreaChart>
           </ResponsiveContainer>
        </div>
        <div className="flex justify-between items-end">
           <div className="space-y-1">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Active_Force</p>
              <p className="text-2xl font-bold">4,821</p>
           </div>
           <Users size={32} className="text-muted-foreground opacity-20" />
        </div>
      </Card>

      <Card className="p-8 glass border-white/10 space-y-6 lg:col-span-1 animate-reveal">
         <div className="space-y-1">
            <Badge variant="outline" className="glass border-rose-500/20 text-rose-500">HAZARD_INDEX</Badge>
            <h3 className="text-2xl font-bold tracking-tight">Environmental Stress</h3>
         </div>
         <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 16 }).map((_, i) => (
              <div 
                key={i} 
                className={cn(
                  "aspect-square rounded-lg transition-all hover:scale-110 cursor-pointer overflow-hidden relative",
                  i === 5 || i === 10 ? "bg-rose-500 shadow-glow-rose" : 
                  i % 3 === 0 ? "bg-amber-500/40" : "bg-white/5"
                )}
              >
                 {i === 5 && <div className="absolute inset-0 bg-white/20 animate-pulse" />}
              </div>
            ))}
         </div>
         <div className="flex items-center gap-3 text-rose-500/80">
            <AlertTriangle size={16} />
            <p className="text-[10px] font-bold uppercase tracking-widest leading-tight">Sectors 5 and 10 flagged for extreme thermal stress.</p>
         </div>
      </Card>

      <div className="lg:col-span-3">
         <MortalityAnalytics />
      </div>
    </div>
  );
}
