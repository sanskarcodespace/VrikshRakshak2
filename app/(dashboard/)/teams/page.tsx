import { DashboardContainer } from "@/components/layout/DashboardContainer";
import { Card, CardContent } from "@/components/ui/Card";
import { Users, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function TeamsPage() {
  return (
    <DashboardContainer>
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">My Teams</h2>
          <p className="text-muted-foreground">Collaborate with other Protectors in groups.</p>
        </div>
        <Button className="rounded-2xl gap-2 shadow-soft"><UserPlus size={18} /> Invite Member</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <Card>
            <CardContent className="p-6 flex items-center gap-6">
               <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
                  <Users size={32} />
               </div>
               <div className="flex-1">
                  <h3 className="text-xl font-bold">Western Ghats Squad</h3>
                  <p className="text-sm text-muted-foreground">12 Members • 4 Active Projects</p>
               </div>
               <Button variant="outline">View</Button>
            </CardContent>
         </Card>
      </div>
    </DashboardContainer>
  );
}
