import { DashboardContainer, CardGridSystem } from "@/components/layout/DashboardContainer";
import { StatCard } from "@/components/ui/StatCard";
import { GraphCard, MapCard, LeaderboardCard } from "@/components/ui/SpecializedCards";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { AvatarGroup } from "@/components/ui/AvatarGroup";
import { Badge } from "@/components/ui/Badge";
import { FAB } from "@/components/ui/FAB";
import { Trees, Zap, Droplets, Wind } from "lucide-react";

export default function DashboardPage() {
  const topProtectors = [
    { name: "Arjun Singh", trees: 120, points: 2450 },
    { name: "Sarah Connor", trees: 98, points: 2100 },
    { name: "David Miller", trees: 85, points: 1950 },
    { name: "Priya Rao", trees: 72, points: 1800 },
  ];

  const avatarUrls = [
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
  ];

  return (
    <DashboardContainer>
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2">
          <h2 className="text-4xl font-bold tracking-tight bg-primary-gradient bg-clip-text text-transparent">Overview_v2.0</h2>
          <p className="text-muted-foreground font-medium">Welcome back, Protector. Core systems are operational.</p>
        </div>
        <div className="flex items-center gap-4 glass p-2 rounded-2xl">
           <span className="text-xs font-bold text-muted-foreground px-3">TEAM_STATUS:</span>
           <AvatarGroup avatars={avatarUrls} />
        </div>
      </div>

      <CardGridSystem columns={4}>
        <div className="p-6 rounded-2xl glass shadow-soft flex items-center justify-between hover-scale">
           <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Ecosystem Health</p>
              <p className="text-3xl font-bold">94%</p>
           </div>
           <ProgressRing value={94} size={64} strokeWidth={8} />
        </div>
        <StatCard title="Tree Count" value="2,480" change="+12 this month" icon={Trees} trend="up" />
        <StatCard title="Soil Moisture" value="68%" change="-5%" icon={Droplets} trend="down" />
        <StatCard title="Air Quality" value="12 AQI" icon={Wind} />
      </CardGridSystem>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <GraphCard title="Growth Analytics" description="Tree growth and survival rate over the last 12 months" />
          <MapCard />
        </div>
        <div className="space-y-8">
          <LeaderboardCard players={topProtectors} />
          <div className="p-6 rounded-2xl glass shadow-glow space-y-4">
             <h4 className="font-bold text-accent">ACTIVE_ALERTS</h4>
             <div className="space-y-2">
                <Badge variant="warning" className="w-full justify-between">Low Moisture: Sector 7 <Zap size={12} /></Badge>
                <Badge variant="danger" className="w-full justify-between">Network Failure: Node_842</Badge>
             </div>
          </div>
        </div>
      </div>
      <FAB />
    </DashboardContainer>
  );
}
