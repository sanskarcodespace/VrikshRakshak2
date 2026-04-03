"use client";

import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Trees, AlertCircle, Skull, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

const populationData = [
  { name: 'Healthy/Planted', value: 840, color: '#10b981' },
  { name: 'Dead', value: 120, color: '#ef4444' },
  { name: 'Remains/Stump', value: 40, color: '#94a3b8' },
];

const deathReasonData = [
  { reason: 'Extreme Heat', count: 45 },
  { reason: 'Dehydration', count: 32 },
  { reason: 'Pest Infestation', count: 28 },
  { reason: 'Soil Acidification', count: 15 },
];

export function MortalityAnalytics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 animate-reveal">
      {/* Population Composition */}
      <Card className="p-8 glass border-white/10 space-y-6">
        <div className="space-y-1">
           <Badge variant="outline" className="glass border-primary/20 text-primary">BIOLOGICAL_INVENTORY</Badge>
           <h3 className="text-2xl font-bold tracking-tight">Population Dynamics</h3>
        </div>
        <div className="h-[300px] w-full">
           <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                 <Pie
                    data={populationData}
                    innerRadius={80}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                 >
                    {populationData.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                 </Pie>
                 <Tooltip 
                    contentStyle={{backgroundColor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px'}}
                 />
                 <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
           </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/5">
           <div className="text-center">
              <p className="text-[10px] uppercase font-bold text-muted-foreground">Total_Planted</p>
              <p className="text-xl font-bold">1,000</p>
           </div>
           <div className="text-center">
              <p className="text-[10px] uppercase font-bold text-rose-500">Dead</p>
              <p className="text-xl font-bold">120</p>
           </div>
           <div className="text-center">
              <p className="text-[10px] uppercase font-bold text-muted-foreground">Remains</p>
              <p className="text-xl font-bold">40</p>
           </div>
        </div>
      </Card>

      {/* Reason for Loss */}
      <Card className="p-8 glass border-white/10 space-y-6">
        <div className="space-y-1">
           <Badge variant="outline" className="glass border-rose-500/20 text-rose-500">MORTALITY_DIAGNOSTICS</Badge>
           <h3 className="text-2xl font-bold tracking-tight">Root Cause Analysis</h3>
        </div>
        <div className="h-[300px] w-full">
           <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deathReasonData} layout="vertical">
                 <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.05)" />
                 <XAxis type="number" hide />
                 <YAxis 
                    dataKey="reason" 
                    type="category" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: 'rgba(255,255,255,0.6)', fontSize: 12}}
                    width={100}
                 />
                 <Tooltip 
                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                    contentStyle={{backgroundColor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px'}}
                 />
                 <Bar dataKey="count" fill="#ef4444" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
           </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-rose-500/5 border border-rose-500/10">
           <Skull className="text-rose-500" size={24} />
           <p className="text-xs font-medium leading-tight text-muted-foreground">
             Thermal stress accounts for <span className="text-rose-500 font-bold">37.5%</span> of total plant mortality in Sector 4-A.
           </p>
        </div>
      </Card>
    </div>
  );
}
