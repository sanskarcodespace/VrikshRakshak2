import { DashboardContainer } from "@/components/layout/DashboardContainer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Cpu, Wifi, Battery, Activity, ShieldAlert } from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";

export default function AdminSensorsPage() {
  return (
    <DashboardContainer>
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight text-rose-600">Sensor Mesh Network</h2>
          <p className="text-muted-foreground">Manage hardware deployments and telemetry nodes.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <StatCard title="Online Nodes" value="1,240" change="Stable" icon={Wifi} />
           <StatCard title="Total Failures" value="12" change="-2 this week" icon={ShieldAlert} trend="up" />
           <StatCard title="Avg Latency" value="42ms" icon={Activity} />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
           {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i}>
                 <CardContent className="pt-6 space-y-4">
                    <div className="flex justify-between items-start">
                       <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg"><Cpu size={20} /></div>
                       <span className="text-[10px] font-bold text-muted-foreground">node_v4_{i}</span>
                    </div>
                    <div>
                       <h4 className="font-bold">Sector { String.fromCharCode(65 + i) }</h4>
                       <p className="text-xs text-muted-foreground">Coordinates: 42.1N, 73.4W</p>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                       <div className="flex items-center gap-1"><Battery size={14} className="text-emerald-500" /> 84%</div>
                       <span className="text-emerald-500 font-bold uppercase">Online</span>
                    </div>
                 </CardContent>
              </Card>
           ))}
        </div>
    </DashboardContainer>
  );
}
