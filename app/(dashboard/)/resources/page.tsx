import { DashboardContainer } from "@/components/layout/DashboardContainer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Book, Video, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ResourcesPage() {
  return (
    <DashboardContainer>
      <div className="space-y-1">
        <h2 className="text-3xl font-bold tracking-tight">Learning Resources</h2>
        <p className="text-muted-foreground">Expert guides and tutorials on forest conservation and restoration.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 9 }).map((_, i) => (
          <Card key={i} className="overflow-hidden hover:shadow-soft-lg transition-all">
            <div className="aspect-video bg-accent flex items-center justify-center text-primary/20">
               <Video size={48} />
            </div>
            <CardHeader>
              <CardTitle className="text-lg">Resource Tutorial {i + 1}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Learn the best practices for soil preparation and sapling care in tropical climates.</p>
              <Button variant="outline" className="w-full gap-2"><Book size={16} /> View Guide</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardContainer>
  );
}
