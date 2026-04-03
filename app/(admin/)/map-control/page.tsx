import { DashboardContainer } from "@/components/layout/DashboardContainer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Map, Layers, Navigation, Crosshair } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminMapControlPage() {
  return (
    <DashboardContainer>
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight text-rose-600">Geo-Spatial Control</h2>
          <p className="text-muted-foreground">Manage map layers, zone boundaries, and GPS deployments.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         <Card className="lg:col-span-3 h-[600px] relative bg-slate-900 border-rose-900/20 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
               <Map size={200} className="text-primary" />
            </div>
            <div className="absolute top-6 right-6 space-y-2">
               <Button size="icon" className="bg-slate-800/80 backdrop-blur border-slate-700"><Layers size={20} /></Button>
               <Button size="icon" className="bg-slate-800/80 backdrop-blur border-slate-700"><Navigation size={20}/></Button>
               <Button size="icon" className="bg-slate-800/80 backdrop-blur border-slate-700"><Crosshair size={20}/></Button>
            </div>
            <div className="absolute bottom-6 left-6 right-6 p-4 bg-slate-800/80 backdrop-blur border border-slate-700 rounded-2xl">
               <div className="flex justify-between items-center text-sm text-slate-300">
                  <span>Target Mesh: active_forest_01</span>
                  <span>Accuracy: ±0.5m</span>
                  <span>Nodes: 1,240</span>
               </div>
            </div>
         </Card>

         <div className="space-y-6">
            <Card>
               <CardHeader><CardTitle className="text-sm uppercase tracking-wider text-muted-foreground italic">Zone Control</CardTitle></CardHeader>
               <CardContent className="space-y-4">
                  { ['Sector A', 'Sector B', 'Core Zone'].map(z => (
                     <div key={z} className="flex items-center justify-between p-3 border rounded-xl hover:bg-accent transition-all cursor-pointer">
                        <span className="text-sm font-medium">{z}</span>
                        <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                     </div>
                  ))}
                  <Button className="w-full rounded-2xl mt-4">+ Create New Zone</Button>
               </CardContent>
            </Card>
         </div>
      </div>
    </DashboardContainer>
  );
}
