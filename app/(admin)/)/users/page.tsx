import { DashboardContainer } from "@/components/layout/DashboardContainer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Users, Filter, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function AdminUsersPage() {
  return (
    <DashboardContainer>
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight text-rose-600">User Management</h2>
          <p className="text-muted-foreground">Monitor and manage all global protectors and admin accounts.</p>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
           <div className="flex-1 max-w-md">
              <Input placeholder="Search users by name, email, or role..." />
           </div>
           <Button variant="outline" className="ml-4 gap-2"><Filter size={18} /> Filters</Button>
        </CardHeader>
        <CardContent>
           <table className="w-full text-left">
              <thead className="border-b">
                 <tr>
                    <th className="pb-4 font-bold text-sm">User</th>
                    <th className="pb-4 font-bold text-sm">Role</th>
                    <th className="pb-4 font-bold text-sm">Status</th>
                    <th className="pb-4 font-bold text-sm">Joined</th>
                    <th className="pb-4 font-bold text-sm text-right">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y">
                 {Array.from({ length: 8 }).map((_, i) => (
                    <tr key={i} className="group">
                       <td className="py-4">
                          <div className="flex items-center gap-3">
                             <div className="w-8 h-8 bg-accent rounded-full" />
                             <div>
                                <p className="text-sm font-medium">User Name {i}</p>
                                <p className="text-xs text-muted-foreground">user{i}@example.com</p>
                             </div>
                          </div>
                       </td>
                       <td className="py-4 text-sm">{ i % 5 === 0 ? "Admin" : "Protector" }</td>
                       <td className="py-4">
                          <span className="text-[10px] font-bold bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full uppercase">Active</span>
                       </td>
                       <td className="py-4 text-sm text-muted-foreground">Jan { 10 + i }, 2024</td>
                       <td className="py-4 text-right">
                          <Button variant="ghost" size="icon"><MoreVertical size={16} /></Button>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </CardContent>
      </Card>
    </DashboardContainer>
  );
}
