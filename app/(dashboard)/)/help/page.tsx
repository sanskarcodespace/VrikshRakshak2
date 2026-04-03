import { DashboardContainer } from "@/components/layout/DashboardContainer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { HelpCircle, Book, MessageCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function HelpPage() {
  return (
    <DashboardContainer>
      <div className="text-center space-y-4 py-12">
        <h2 className="text-4xl font-bold tracking-tight">How can we help?</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">Search our knowledge base or get in touch with our support team.</p>
        <div className="max-w-md mx-auto">
           <Input placeholder="Search for documentation, guides, or FAQs..." className="h-12 rounded-2xl text-center" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <Card className="text-center p-8 space-y-4 hover:shadow-soft-lg transition-all cursor-pointer">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto">
               <FileText size={32} />
            </div>
            <h3 className="text-xl font-bold">Documentation</h3>
            <p className="text-sm text-muted-foreground">Everything you need to know about setting up and managing your forest.</p>
         </Card>
         <Card className="text-center p-8 space-y-4 hover:shadow-soft-lg transition-all cursor-pointer">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto">
               <MessageCircle size={32} />
            </div>
            <h3 className="text-xl font-bold">Community Support</h3>
            <p className="text-sm text-muted-foreground">Talk to other Protectors and experts in our community forum.</p>
         </Card>
         <Card className="text-center p-8 space-y-4 hover:shadow-soft-lg transition-all cursor-pointer">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto">
               <HelpCircle size={32} />
            </div>
            <h3 className="text-xl font-bold">Contact Us</h3>
            <p className="text-sm text-muted-foreground">Our support team is here to help you with any technical issues.</p>
         </Card>
      </div>

      <Card className="mt-12">
         <CardHeader><CardTitle>Frequently Asked Questions</CardTitle></CardHeader>
         <CardContent className="space-y-4">
            { [1,2,3,4].map(i => (
               <div key={i} className="border-b last:border-0 pb-4">
                  <h4 className="font-medium mb-1">How do I track my impact in real-time?</h4>
                  <p className="text-sm text-muted-foreground">Impact tracking is available through the Analytics dashboard, which updates every 5 minutes based on sensor telemetry.</p>
               </div>
            ))}
         </CardContent>
      </Card>
    </DashboardContainer>
  );
}
