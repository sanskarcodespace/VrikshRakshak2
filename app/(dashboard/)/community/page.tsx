import { DashboardContainer } from "@/components/layout/DashboardContainer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Users, MessageSquare, Share2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function CommunityPage() {
  return (
    <DashboardContainer>
      <div className="space-y-1">
        <h2 className="text-3xl font-bold tracking-tight">Community Hub</h2>
        <p className="text-muted-foreground">Connect with other Protectors and share your forest's progress.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
           {Array.from({ length: 5 }).map((_, i) => (
              <Card key={i}>
                 <CardHeader className="flex flex-row items-center gap-4">
                    <div className="w-10 h-10 bg-accent rounded-full" />
                    <div>
                       <CardTitle className="text-base">Protector_{i + 100}</CardTitle>
                       <p className="text-xs text-muted-foreground">Posted 2 hours ago in #Reforestation</p>
                    </div>
                 </CardHeader>
                 <CardContent className="space-y-4">
                    <p className="text-sm">Just finished the seasonal watering for Sector 7. The saplings are looking great! 🌲✨</p>
                    <div className="h-48 bg-accent/50 rounded-xl flex items-center justify-center italic text-muted-foreground">
                       User Image Placeholder
                    </div>
                    <div className="flex gap-4 pt-2">
                       <Button variant="ghost" size="sm" className="gap-2"><MessageSquare size={16} /> 12</Button>
                       <Button variant="ghost" size="sm" className="gap-2"><Share2 size={16} /> Share</Button>
                    </div>
                 </CardContent>
              </Card>
           ))}
        </div>
        <aside className="space-y-6">
           <Card>
              <CardHeader><CardTitle className="text-lg">Trending Topics</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                 <p className="text-sm font-medium text-primary cursor-pointer hover:underline">#SaveTheSequoias</p>
                 <p className="text-sm font-medium text-primary cursor-pointer hover:underline">#DroneMonitoring</p>
                 <p className="text-sm font-medium text-primary cursor-pointer hover:underline">#SoilHealth2024</p>
              </CardContent>
           </Card>
        </aside>
      </div>
    </DashboardContainer>
  );
}
