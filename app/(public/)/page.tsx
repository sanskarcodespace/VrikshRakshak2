import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { StatCard } from "@/components/ui/StatCard";
import { Trees, Shield, Users, Activity } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero */}
      <section className="px-6 md:px-12 py-20 text-center max-w-5xl mx-auto space-y-8 animate-in fade-in zoom-in duration-700">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          The World's Most <span className="text-primary">Intelligent</span> Forest Protection System
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Monitor, protect, and track reforestation efforts with real-time analytics and community-driven action.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" className="px-10">Start Protecting</Button>
          <Button size="lg" variant="outline" className="px-10">Watch Demo</Button>
        </div>
      </section>

      {/* Social Proof Stats */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Active Projects" value="482" change="+12% this month" icon={Activity} />
          <StatCard title="Trees Saved" value="1.2M+" change="+240k" icon={Trees} trend="up" />
          <StatCard title="Global Protectors" value="15.4k" change="+1.2k" icon={Users} />
          <StatCard title="CO2 Offset" value="24.5k Ton" change="+8.3k" icon={Shield} />
        </div>
      </section>

      {/* Features Wireframes */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto w-full grid md:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="hover:-translate-y-2">
            <CardContent className="p-8 space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-bold">Feature Wireframe {i}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Wireframe placeholder for advanced reforestation tracking and satellite monitoring data.
              </p>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
