import { DashboardContainer } from "@/components/layout/DashboardContainer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { LayoutGrid, List, Plus } from "lucide-react";

export default function ProjectsPage() {
  const projects = [
    { name: "Green Valley Reforestation", status: "Active", progress: 65 },
    { name: "Amazon Shield 2024", status: "Planning", progress: 12 },
    { name: "Siberian Taiga Recovery", status: "Active", progress: 42 },
  ];

  return (
    <DashboardContainer>
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">Ecosystem Projects</h2>
          <p className="text-muted-foreground">Collaborative efforts to restore specific forest sectors.</p>
        </div>
        <Button className="rounded-2xl gap-2 shadow-soft"><Plus size={18} /> Create Project</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((p, i) => (
          <Card key={i} className="hover:border-primary/50 transition-all">
            <CardHeader>
              <CardTitle>{p.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <span className="font-bold text-primary">{p.status}</span>
              </div>
              <div className="w-full bg-accent h-2 rounded-full overflow-hidden">
                 <div className="bg-primary h-full transition-all" style={{ width: `${p.progress}%` }} />
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground uppercase font-bold">
                 <span>{p.progress}% Complete</span>
                 <span>Target: 10k Trees</span>
              </div>
              <Button variant="outline" className="w-full rounded-xl">View Project</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardContainer>
  );
}
