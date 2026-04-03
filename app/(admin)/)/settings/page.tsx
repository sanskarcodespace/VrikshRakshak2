import { DashboardContainer } from "@/components/layout/DashboardContainer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Settings, Shield, Bell, Cpu, Globe } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminSettingsPage() {
  return (
    <DashboardContainer>
      <div className="space-y-1">
        <h2 className="text-3xl font-bold tracking-tight text-rose-600">Global System Settings</h2>
        <p className="text-muted-foreground">Configure enterprise-level parameters and security policies.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <Card>
            <CardHeader>
               <div className="flex items-center gap-2">
                  <Shield size={20} className="text-rose-500" />
                  <CardTitle>Auth & Security Policies</CardTitle>
               </div>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Require 2FA for all Admins</p>
                  <Button size="sm" variant="outline">Enabled</Button>
               </div>
               <div className="flex items-center justify-between border-t pt-6">
                  <p className="text-sm font-medium">Auto-lock Inactive Accounts</p>
                  <Button size="sm" variant="outline">30 Days</Button>
               </div>
            </CardContent>
         </Card>

         <Card>
            <CardHeader>
               <div className="flex items-center gap-2">
                  <Cpu size={20} className="text-blue-500" />
                  <CardTitle>Telemetry Frequency</CardTitle>
               </div>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Satellite Update Interval</p>
                  <Button size="sm" variant="outline">6 Hours</Button>
               </div>
               <div className="flex items-center justify-between border-t pt-6">
                  <p className="text-sm font-medium">Sensor Mesh Polling Rate</p>
                  <Button size="sm" variant="outline">15 Minutes</Button>
               </div>
            </CardContent>
         </Card>
      </div>
    </DashboardContainer>
  );
}
