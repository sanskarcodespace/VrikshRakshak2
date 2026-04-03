"use client";

import { useState } from "react";
import { DashboardContainer } from "@/components/layout/DashboardContainer";
import { Table, TableHeader, TableRow, TableHead, TableCell } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Search, Filter, Plus } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { RegisterTreeForm } from "@/components/trees/RegisterTreeForm";
import { TreeMap } from "@/components/maps/TreeMap";

export default function TreesPage() {
  const [view, setView] = useState<"list" | "map">("list");
  const [isRegistering, setIsRegistering] = useState(false);
  
  const trees = [
    { id: "T-842", species: "Silver Birch", health: 94, status: "Healthy", location: "Sector 7-A", lat: 28.6139, lng: 77.2090 },
    { id: "T-843", species: "Red Oak", health: 62, status: "Warning", location: "Sector 3-B", lat: 19.0760, lng: 72.8777 },
    { id: "T-844", species: "Norway Spruce", health: 88, status: "Healthy", location: "Sector 1-C", lat: 12.9716, lng: 77.5946 },
    { id: "T-845", species: "English Oak", health: 12, status: "Critical", location: "Sector 7-B", lat: 22.5726, lng: 88.3639 },
  ];

  return (
    <DashboardContainer>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <Badge variant="outline" className="glass border-primary/20 text-primary mb-2">TELEMETRY_INDEX :: v3.0</Badge>
          <h2 className="text-3xl font-bold tracking-tight">Tree Inventory</h2>
          <p className="text-muted-foreground font-medium">Manage and monitor 2,480 active specimens.</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="flex bg-white/5 rounded-2xl p-1 border border-white/5">
              <button 
                onClick={() => setView("list")}
                className={cn("px-4 py-2 rounded-xl text-xs font-bold transition-all", view === "list" ? "bg-primary shadow-glow text-white" : "text-muted-foreground hover:text-white")}
              >LIST</button>
              <button 
                onClick={() => setView("map")}
                className={cn("px-4 py-2 rounded-xl text-xs font-bold transition-all", view === "map" ? "bg-primary shadow-glow text-white" : "text-muted-foreground hover:text-white")}
              >MAP</button>
           </div>
           <Button className="rounded-2xl gap-2 shadow-glow h-12 px-6" onClick={() => setIsRegistering(true)}>
             <Plus size={18} /> Register Tree
           </Button>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input placeholder="Search by ID, Species, or Sector..." className="pl-10 h-12 rounded-2xl glass" />
        </div>
        <Button variant="outline" className="gap-2 h-12 rounded-2xl glass"><Filter size={18} /> Filters</Button>
      </div>

      {view === "list" ? (
        <Table>
          <TableHeader>
             <TableRow>
                <TableHead>Tree ID</TableHead>
                <TableHead>Species</TableHead>
                <TableHead>Health Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Actions</TableHead>
             </TableRow>
          </TableHeader>
          <tbody>
             {trees.map((tree) => (
                <TableRow key={tree.id}>
                   <TableCell className="font-mono text-xs">{tree.id}</TableCell>
                   <TableCell className="font-medium text-foreground">{tree.species}</TableCell>
                   <TableCell>
                      <div className="flex items-center gap-2">
                         <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-primary shadow-glow" style={{ width: `${tree.health}%` }} />
                         </div>
                         <span className="text-xs font-bold">{tree.health}%</span>
                      </div>
                   </TableCell>
                   <TableCell>
                      <Badge variant={tree.status === "Healthy" ? "success" : tree.status === "Warning" ? "warning" : "danger"}>
                         {tree.status}
                      </Badge>
                   </TableCell>
                   <TableCell className="text-muted-foreground">{tree.location}</TableCell>
                   <TableCell className="text-right">
                      <Link href={`/trees/${tree.id}`}>
                         <Button variant="ghost" size="sm" className="rounded-xl hover:bg-primary/10 hover:text-primary">View Data</Button>
                      </Link>
                   </TableCell>
                </TableRow>
             ))}
          </tbody>
        </Table>
      ) : (
        <TreeMap trees={trees} className="h-[600px]" />
      )}

      {/* Registration Modal Overlay */}
      {isRegistering && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background/80 backdrop-blur-xl animate-in fade-in duration-300">
           <RegisterTreeForm 
              onCancel={() => setIsRegistering(false)} 
              onSuccess={(data) => {
                console.log("Success:", data);
                setIsRegistering(false);
                alert(`Tree ${data.id} registered successfully!`);
              }}
           />
        </div>
      )}
    </DashboardContainer>
  );
}
