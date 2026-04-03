import { DashboardContainer } from "@/components/layout/DashboardContainer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { CreditCard, History, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function BillingPage() {
  return (
    <DashboardContainer>
      <div className="space-y-1">
        <h2 className="text-3xl font-bold tracking-tight">Sponsorship & Billing</h2>
        <p className="text-muted-foreground">Manage your contributions and sponsorship plans.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <Card className="lg:col-span-2">
            <CardHeader>
               <CardTitle>Active Plan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
               <div className="flex items-center justify-between p-6 bg-primary/5 border border-primary/20 rounded-2xl">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-primary-foreground">
                        <Zap size={24} />
                     </div>
                     <div>
                        <h3 className="text-xl font-bold">Pro Guardian</h3>
                        <p className="text-sm text-muted-foreground">Sponsoring 10 Trees/Month</p>
                     </div>
                  </div>
                  <div className="text-right">
                     <p className="text-2xl font-bold">$25.00</p>
                     <p className="text-xs text-muted-foreground">per month</p>
                  </div>
               </div>
               
               <div className="space-y-4">
                  <h4 className="font-bold">Next Sponsorship Date</h4>
                  <p className="text-sm text-muted-foreground">Your next contribution is scheduled for April 15, 2024.</p>
                  <div className="flex gap-4">
                     <Button variant="outline">Change Plan</Button>
                     <Button variant="outline" className="text-rose-500">Cancel Sponsorship</Button>
                  </div>
               </div>
            </CardContent>
         </Card>

         <Card>
            <CardHeader>
               <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="flex items-center gap-4 p-4 border rounded-xl">
                  <CreditCard className="text-muted-foreground" />
                  <div className="flex-1">
                     <p className="text-sm font-bold">•••• •••• •••• 4242</p>
                     <p className="text-[10px] text-muted-foreground uppercase font-bold">Visa Card • Exp 12/26</p>
                  </div>
                  <Button variant="ghost" size="sm">Edit</Button>
               </div>
               <Button variant="outline" className="w-full">Add New Method</Button>
            </CardContent>
         </Card>
      </div>
      
      <Card>
         <CardHeader>
            <CardTitle>Sponsorship History</CardTitle>
         </CardHeader>
         <CardContent>
            {Array.from({ length: 5 }).map((_, i) => (
               <div key={i} className="flex justify-between items-center py-4 border-b last:border-0">
                  <div className="flex items-center gap-4">
                     <div className="p-2 bg-secondary rounded-lg"><History size={16} /></div>
                     <div>
                        <p className="text-sm font-medium">Monthly Sponsorship Payment</p>
                        <p className="text-xs text-muted-foreground">March { 15 - i }, 2024</p>
                     </div>
                  </div>
                  <div className="text-right">
                     <p className="text-sm font-bold">$25.00</p>
                     <span className="text-[10px] bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full font-bold">Paid</span>
                  </div>
               </div>
            ))}
         </CardContent>
      </Card>
    </DashboardContainer>
  );
}
