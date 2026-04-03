import { DashboardContainer, CardGridSystem } from "@/components/layout/DashboardContainer";
import { StatCard } from "@/components/ui/StatCard";
import { GraphCard, MapCard, LeaderboardCard } from "@/components/ui/SpecializedCards";
import { Trees, Zap, Droplets, Wind } from "lucide-react";

export default function DashboardPage() {
  const topProtectors = [
    { name: "Arjun Singh", trees: 120, points: 2450 },
    { name: "Sarah Connor", trees: 98, points: 2100 },
    { name: "David Miller", trees: 85, points: 1950 },
    { name: "Priya Rao", trees: 72, points: 1800 },
  ];

  return (
    <DashboardContainer>
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
        <p className="text-muted-foreground">Welcome back, Protector. Here's your forest's health today.</p>
      </div>

      <CardGridSystem columns={4}>
        <StatCard title="Health Score" value="94/100" change="+2% from last week" icon={Zap} trend="up" />
        <StatCard title="Tree Count" value="2,480" change="+12 this month" icon={Trees} trend="up" />
        <StatCard title="Soil Moisture" value="68%" change="-5%" icon={Droplets} trend="down" />
        <StatCard title="Air Quality" value="12 AQI" change="Pristine" icon={Wind} />
      </CardGridSystem>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <GraphCard title="Growth Analytics" description="Tree growth and survival rate over the last 12 months" />
          <MapCard />
        </div>
        <div className="space-y-8">
          <LeaderboardCard players={topProtectors} />
          <GraphCard title="Yield Estimates" className="h-[250px]" />
        </div>
      </div>
    </DashboardContainer>
  );
}
