import { DashboardContainer } from "@/components/layout/DashboardContainer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { History, Zap, Trees, Droplets } from "lucide-react";

export default function ActivityPage() {
  const activities = [
    { type: "planting", title: "Planted 5 Silver Birch saplings", time: "2 hours ago", icon: Trees, color: "bg-emerald-100 text-emerald-600" },
    { type: "watering", title: "Automated irrigation triggered in Zone A", time: "4 hours ago", icon: Droplets, color: "bg-blue-100 text-blue-600" },
    { type: "system", title: "Sensor node_842 updated to v2.4", time: "Yesterday", icon: Zap, color: "bg-amber-100 text-amber-600" },
  ];

  return (
    <DashboardContainer>
      <div className="space-y-1">
        <h2 className="text-3xl font-bold tracking-tight">Recent Activity</h2>
        <p className="text-muted-foreground">Detailed log of all actions taken in your supervised zones.</p>
      </div>

      <div className="space-y-6 max-w-3xl">
         {activities.map((act, i) => (
            <div key={i} className="flex gap-4 relative">
               { i !== activities.length - 1 && <div className="absolute left-6 top-10 bottom-0 w-0.5 bg-accent" /> }
               <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 z-10 ${act.color}`}>
                  <act.icon size={20} />
               </div>
               <Card className="flex-1">
                  <CardContent className="p-4">
                     <p className="font-medium">{act.title}</p>
                     <p className="text-xs text-muted-foreground mt-1">{act.time}</p>
                  </CardContent>
               </Card>
            </div>
         ))}
      </div>
    </DashboardContainer>
  );
}
