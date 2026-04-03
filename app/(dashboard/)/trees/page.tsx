import { DashboardContainer, CardGridSystem } from "@/components/layout/DashboardContainer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Search, Plus, Filter } from "lucide-react";

export default function TreesPage() {
  const trees = Array.from({ length: 12 }).map((_, i) => ({
    id: `TR-${1000 + i}`,
    species: ["Giant Sequoia", "Silver Birch", "European Oak", "Sugar Maple"][i % 4],
    status: ["Healthy", "Monitored", "Critical"][i % 3],
    location: "Zone A-4",
  }));

  return (
    <DashboardContainer>
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">Tree Inventory</h2>
          <p className="text-muted-foreground">Manage and track individual tree health across all zones.</p>
        </div>
        <Button className="rounded-2xl gap-2 shadow-soft">
          <Plus size={20} /> Add New Tree
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input className="pl-10" placeholder="Search by ID, species, or zone..." />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter size={18} /> Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {trees.map((tree) => (
          <Card key={tree.id} className="group hover:border-primary/50 cursor-pointer overflow-hidden">
            <div className="h-32 bg-accent/50 relative overflow-hidden">
               <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-20">🌲</div>
            </div>
            <CardHeader className="p-4">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{tree.species}</CardTitle>
                <span className="text-[10px] font-bold bg-secondary px-2 py-0.5 rounded-full uppercase">{tree.id}</span>
              </div>
              <p className="text-sm text-muted-foreground">{tree.location}</p>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex justify-between items-center">
              <span className={`text-xs font-bold px-2 py-1 rounded-lg ${
                tree.status === "Healthy" ? "bg-emerald-100 text-emerald-600" :
                tree.status === "Critical" ? "bg-rose-100 text-rose-600" : "bg-amber-100 text-amber-600"
              }`}>{tree.status}</span>
              <Button variant="ghost" size="sm" className="h-8">View Details</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardContainer>
  );
}
