import { DashboardContainer, CardGridSystem } from "@/components/layout/DashboardContainer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { StatCard } from "@/components/ui/StatCard";
import { Users, ShieldAlert, Server, BarChart2 } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <DashboardContainer>
      <div className="space-y-1">
        <h2 className="text-3xl font-bold tracking-tight text-rose-600">Admin Control Center</h2>
        <p className="text-muted-foreground">Global system monitoring and administrative tools.</p>
      </div>

      <CardGridSystem columns={4}>
        <StatCard title="Total Users" value="15,420" change="+140 today" icon={Users} />
        <StatCard title="System Health" value="99.9%" change="Stable" icon={Server} />
        <StatCard title="Active Alerts" value="3" change="2 Critical" icon={ShieldAlert} trend="down" />
        <StatCard title="Revenue (MTD)" value="$42,500" change="+18%" icon={BarChart2} trend="up" />
      </CardGridSystem>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
             <CardTitle>Recent Administrative Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b last:border-0">
                   <div className="flex flex-col">
                      <span className="text-sm font-medium">User "admin_01" updated Zone B thresholds</span>
                      <span className="text-xs text-muted-foreground">14:24 PM Today</span>
                   </div>
                   <span className="text-xs font-mono bg-accent px-2 py-1 rounded">id: 842{i}</span>
                </div>
             ))}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
             <CardTitle>Global Sensor Status</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] border-2 border-dashed rounded-xl flex items-center justify-center text-muted-foreground">
             Sensor Mesh Visualization Placeholder
          </CardContent>
        </Card>
      </div>
    </DashboardContainer>
  );
}
