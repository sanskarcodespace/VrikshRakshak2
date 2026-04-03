import { DashboardContainer } from "@/components/layout/DashboardContainer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { History, Shield, Lock } from "lucide-react";

export default function AdminAuditPage() {
  return (
    <DashboardContainer>
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight text-rose-600">Security Audit Logs</h2>
          <p className="text-muted-foreground">Official record of all high-privilege system modifications.</p>
        </div>

        <Card>
           <CardContent className="p-0">
              <table className="w-full text-left">
                 <thead className="bg-accent/50 border-b">
                    <tr>
                       <th className="p-4 font-bold text-sm">Event ID</th>
                       <th className="p-4 font-bold text-sm">Action</th>
                       <th className="p-4 font-bold text-sm">Admin</th>
                       <th className="p-4 font-bold text-sm">Timestamp</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y">
                    {Array.from({ length: 15 }).map((_, i) => (
                       <tr key={i}>
                          <td className="p-4 text-xs font-mono">AUDIT-{1000 + i}</td>
                          <td className="p-4">
                             <div className="flex items-center gap-2">
                                <Lock size={14} className="text-rose-500" />
                                <span className="text-sm font-medium">Policy Modification</span>
                             </div>
                          </td>
                          <td className="p-4 text-sm font-medium">admin_0{ (i % 3) + 1 }</td>
                          <td className="p-4 text-xs text-muted-foreground">{ new Date().toLocaleDateString() }</td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </CardContent>
        </Card>
    </DashboardContainer>
  );
}
