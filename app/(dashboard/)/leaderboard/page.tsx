import { DashboardContainer } from "@/components/layout/DashboardContainer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { LeaderboardCard } from "@/components/ui/SpecializedCards";
import { Trophy, Medal, Target } from "lucide-react";

export default function LeaderboardPage() {
  const topProtectors = [
    { name: "Arjun Singh", trees: 120, points: 2450 },
    { name: "Sarah Connor", trees: 98, points: 2100 },
    { name: "David Miller", trees: 85, points: 1950 },
    { name: "Priya Rao", trees: 72, points: 1800 },
    { name: "James Wilson", trees: 65, points: 1700 },
    { name: "Anna Smith", trees: 60, points: 1650 },
    { name: "Robert Fox", trees: 58, points: 1600 },
    { name: "Elena Gilbert", trees: 55, points: 1550 },
  ];

  return (
    <DashboardContainer>
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">Global Leaderboard</h2>
          <p className="text-muted-foreground">Top contributors making the biggest impact on reforestation.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <div className="flex items-center gap-2 text-primary">
              <Trophy size={20} />
              <CardTitle className="text-lg">Your Rank</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">#42</div>
            <p className="text-sm text-muted-foreground mt-2">Top 5% of all Protectors</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
             <div className="flex items-center gap-2 text-amber-500">
              <Medal size={20} />
              <CardTitle className="text-lg">Achievements</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">12</div>
            <p className="text-sm text-muted-foreground mt-2">3 badges earned this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
             <div className="flex items-center gap-2 text-blue-500">
              <Target size={20} />
              <CardTitle className="text-lg">Next Goal</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">250 pts</div>
            <p className="text-sm text-muted-foreground mt-2">to reach 'Forest Guardian' tier</p>
          </CardContent>
        </Card>
      </div>

      <LeaderboardCard players={topProtectors} />
    </DashboardContainer>
  );
}
