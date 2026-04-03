import { DashboardContainer } from "@/components/layout/DashboardContainer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function ProfilePage() {
  return (
    <DashboardContainer>
      <div className="space-y-1">
        <h2 className="text-3xl font-bold tracking-tight">My Profile</h2>
        <p className="text-muted-foreground">Manage your personal information and public protector profile.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1">
          <CardContent className="pt-6 text-center space-y-4">
            <div className="w-32 h-32 rounded-full bg-accent border-4 border-background shadow-soft mx-auto overflow-hidden">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Sanskar Sharma</h3>
              <p className="text-sm text-muted-foreground">Forest Guardian • Since 2024</p>
            </div>
            <div className="flex justify-center gap-2 pt-4">
               <div className="text-center px-4 border-r">
                 <p className="text-xl font-bold">1.2k</p>
                 <p className="text-[10px] uppercase text-muted-foreground">Trees</p>
               </div>
               <div className="text-center px-4">
                 <p className="text-xl font-bold">14.5k</p>
                 <p className="text-[10px] uppercase text-muted-foreground">Points</p>
               </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Personal Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input defaultValue="Sanskar Sharma" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input defaultValue="sanskar@vrikshrakshak.org" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Bio</label>
              <textarea className="flex min-h-[100px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 transition-all focus:border-primary" 
                placeholder="Tell us about your mission..." defaultValue="Passionate about environmental conservation and sustainable tech." />
            </div>
            <Button className="rounded-2xl">Save Changes</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardContainer>
  );
}
