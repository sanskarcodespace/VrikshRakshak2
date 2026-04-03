import { DashboardContainer } from "@/components/layout/DashboardContainer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { FileText, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ReportsPage() {
  return (
    <DashboardContainer>
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">Impact Reports</h2>
          <p className="text-muted-foreground">Generated summaries of forest health and contribution impact.</p>
        </div>
        <Button variant="outline" className="gap-2"><Filter size={18} /> Filter Reports</Button>
      </div>

      <div className="space-y-4">
         {Array.from({ length: 10 }).map((_, i) => (
            <Card key={i} className="group">
               <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className="p-2 bg-primary/10 text-primary rounded-xl">
                        <FileText size={24} />
                     </div>
                     <div>
                        <h4 className="font-bold">Impact Report - Q{ (i % 4) + 1 } 202{ 4 - Math.floor(i/4) }</h4>
                        <p className="text-xs text-muted-foreground">Generated on March { 15 - i }, 2024 • 2.4 MB</p>
                     </div>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-2 group-hover:bg-primary group-hover:text-white transition-all">
                     <Download size={16} /> Download
                  </Button>
               </CardContent>
            </Card>
         ))}
      </div>
    </DashboardContainer>
  );
}
