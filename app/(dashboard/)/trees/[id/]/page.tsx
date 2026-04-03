import { DashboardContainer } from "@/components/layout/DashboardContainer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { StatCard } from "@/components/ui/StatCard";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Edit3, Heart, Share2 } from "lucide-react";
import Link from "next/link";

export default function TreeDetailPage() {
  return (
    <DashboardContainer>
      <div className="flex items-center gap-4">
        <Link href="/trees">
          <Button variant="ghost" size="icon"><ArrowLeft /></Button>
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">Tree Details: TR-1024</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="h-[400px] bg-accent/30 flex items-center justify-center">
             <p className="text-muted-foreground italic">High-Resolution Satellite/Drone Imagery Placeholder</p>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Health Timeline</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] border-2 border-dashed rounded-xl flex items-center justify-center text-muted-foreground">
               Growth Monitoring Analytics Placeholder
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Identity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Species</span>
                <span className="font-bold">Giant Sequoia</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Age</span>
                <span className="font-bold">2.4 Years</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Status</span>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-600 rounded-lg font-bold text-xs">Healthy</span>
              </div>
              <Button className="w-full gap-2 rounded-2xl"><Edit3 size={18} /> Update Status</Button>
            </CardContent>
          </Card>
          
          <Card className="bg-rose-50 border-rose-100">
             <CardContent className="pt-6 space-y-4">
                <div className="flex items-center gap-2 text-rose-600">
                   <Heart size={20} fill="currentColor" />
                   <span className="font-bold uppercase tracking-wider text-xs">Sponsor This Tree</span>
                </div>
                <p className="text-sm text-rose-900">Your sponsorship covers the care and monitoring of this tree for 1 year.</p>
                <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white rounded-2xl">Sponsor for $25</Button>
             </CardContent>
          </Card>
        </div>
      </div>
    </DashboardContainer>
  );
}
