"use client";

import { DashboardContainer } from "@/components/layout/DashboardContainer";
import { Table, TableHeader, TableRow, TableHead, TableCell } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Search, Filter, Plus } from "lucide-react";
import Link from "next/link";

export default function TreesPage() {
  const trees = [
    { id: "T-842", species: "Silver Birch", health: 94, status: "Healthy", location: "Sector 7-A" },
    { id: "T-843", species: "Red Oak", health: 62, status: "Warning", location: "Sector 3-B" },
    { id: "T-844", species: "Norway Spruce", health: 88, status: "Healthy", location: "Sector 1-C" },
    { id: "T-845", species: "English Oak", health: 12, status: "Critical", location: "Sector 7-B" },
  ];

  return (
    <DashboardContainer>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">Tree Inventory</h2>
          <p className="text-muted-foreground font-medium">Manage and monitor 2,480 active specimens.</p>
        </div>
        <Button className="rounded-2xl gap-2 shadow-glow"><Plus size={18} /> Register New Tree</Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input placeholder="Search by ID, Species, or Sector..." className="pl-10" />
        </div>
        <Button variant="outline" className="gap-2"><Filter size={18} /> Filters</Button>
      </div>

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
                 <TableCell className="font-medium">{tree.species}</TableCell>
                 <TableCell>
                    <div className="flex items-center gap-2">
                       <div className="w-16 h-1.5 bg-accent/10 rounded-full overflow-hidden">
                          <div className="h-full bg-accent" style={{ width: `${tree.health}%` }} />
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
                       <Button variant="ghost" size="sm">View Data</Button>
                    </Link>
                 </TableCell>
              </TableRow>
           ))}
        </tbody>
      </Table>
    </DashboardContainer>
  );
}
