import { DashboardContainer } from "@/components/layout/DashboardContainer";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";

export default function SettingsPage() {
  return (
    <DashboardContainer>
      <div className="space-y-1">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Configure your account preferences and system integrations.</p>
      </div>

      <div className="space-y-6 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>App Preferences</CardTitle>
            <CardDescription>Customize your dashboard experience.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-muted-foreground">Use premium dark theme for the interface.</p>
              </div>
              <Select className="w-[180px]">
                <option>System Default</option>
                <option>Light</option>
                <option>Dark</option>
              </Select>
            </div>
            <div className="flex items-center justify-between border-t pt-6">
              <div>
                <p className="font-medium">Language</p>
                <p className="text-sm text-muted-foreground">Select your preferred display language.</p>
              </div>
              <Select className="w-[180px]">
                <option>English</option>
                <option>Hindi</option>
                <option>Spanish</option>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>Manage your password and session security.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <Button variant="outline">Change Password</Button>
             <Button variant="outline" className="text-rose-500 hover:text-rose-600 border-rose-200">Delete Account</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardContainer>
  );
}
