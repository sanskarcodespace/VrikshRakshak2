import { DashboardContainer } from "@/components/layout/DashboardContainer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Terminal, ShieldAlert, Cpu } from "lucide-react";

export default function AdminLogsPage() {
  return (
    <DashboardContainer>
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight text-rose-600">System Logs & Audit</h2>
          <p className="text-muted-foreground">Real-time monitoring of system events and security audits.</p>
        </div>

        <Card className="bg-slate-950 text-emerald-500 font-mono text-xs p-6 overflow-hidden">
           <div className="flex items-center gap-2 mb-4 text-emerald-400 border-b border-emerald-900 pb-2">
              <Terminal size={14} />
              <span>LIVE_SYSTEM_STREAM</span>
           </div>
           <div className="space-y-1 opacity-80 h-[400px] overflow-y-auto scrollbar-hide">
              {Array.from({ length: 40 }).map((_, i) => (
                 <div key={i} className="flex gap-4">
                    <span className="text-slate-600 shrink-0">[{ new Date().toISOString() }]</span>
                    <span className={ i % 10 === 0 ? "text-rose-400" : i % 5 === 0 ? "text-amber-400" : "" }>
                       { i % 10 === 0 ? "[CRITICAL] Unauthorized access attempt detected at node_842" : 
                         i % 5 === 0 ? "[WARN] Sensor battery low in Sector 7_Alpha" : 
                         "INFO: Soil moisture telemetry received from sensor_group_21" }
                    </span>
                 </div>
              ))}
           </div>
        </Card>
    </DashboardContainer>
  );
}
