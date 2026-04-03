import { DashboardContainer } from "@/components/layout/DashboardContainer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Trophy, Star, Zap, Award } from "lucide-react";

export default function AchievementsPage() {
  const achievements = [
    { title: "First Sapling", description: "Planted your first tree.", icon: Star, color: "text-amber-500", date: "Jan 12, 2024" },
    { title: "Forest Guardian", description: "Saved 100 trees from critical status.", icon: ShieldAlert, color: "text-rose-500", date: "Feb 05, 2024" },
    { title: "Team Player", description: "Joined your first community project.", icon: Zap, color: "text-blue-500", date: "Feb 20, 2024" },
    { title: "Eco Warrior", description: "Reached 10,000 impact points.", icon: Award, color: "text-emerald-500", date: "In Progress" },
  ];

  return (
    <DashboardContainer>
      <div className="space-y-1">
        <h2 className="text-3xl font-bold tracking-tight">Your Achievements</h2>
        <p className="text-muted-foreground">Unlock rewards and badges as you contribute to forest conservation.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {achievements.map((a, i) => (
          <Card key={i} className={a.date === "In Progress" ? "opacity-50 grayscale" : ""}>
            <CardContent className="pt-6 text-center space-y-4">
               <div className={`w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto ${a.color}`}>
                  <a.icon size={32} />
               </div>
               <div>
                  <h4 className="font-bold">{a.title}</h4>
                  <p className="text-xs text-muted-foreground">{a.description}</p>
               </div>
               <p className="text-[10px] font-bold uppercase tracking-widest">{a.date}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardContainer>
  );
}

import { ShieldAlert } from "lucide-react"; // Re-import for consistency if needed in local scope or just ensure top level
