"use client";

import { 
  CheckCircle2, 
  AlertCircle, 
  Droplets, 
  ThermometerSun, 
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Zap
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { cn } from "@/lib/utils";

interface HealthDiagnosticViewProps {
  result: {
    status: string;
    confidence: number;
    recommendations: string[];
  } | null;
}

export function HealthDiagnosticView({ result }: HealthDiagnosticViewProps) {
  if (!result) return null;

  const statusConfig: any = {
    HEALTHY: { 
      label: "Optimal Health", 
      color: "text-eco-green", 
      bg: "bg-eco-green/10", 
      icon: ShieldCheck,
      details: "Specimen shows robust chlorophyll levels and optimal hydration."
    },
    NEEDS_WATER: { 
      label: "Hydration Deficit", 
      color: "text-blue-500", 
      bg: "bg-blue-500/10", 
      icon: Droplets,
      details: "Cellular turgor pressure is decreasing. Immediate irrigation required."
    },
    DISEASE_SUSPECTED: { 
      label: "Pathogen Alert", 
      color: "text-rose-500", 
      bg: "bg-rose-500/10", 
      icon: AlertCircle,
      details: "Pattern recognition suggests early fungal or bacterial colony formation."
    },
    LOW_SUNLIGHT: { 
      label: "Solar Deficit", 
      color: "text-amber-500", 
      bg: "bg-amber-500/10", 
      icon: ThermometerSun,
      details: "Reduced photosynthesis detected due to surrounding obstructions."
    },
  };

  const config = statusConfig[result.status];

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <Card className="p-8 glass border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <config.icon size={120} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
           <div className="md:col-span-4 flex flex-col items-center justify-center text-center space-y-4 py-4 border-r border-white/5">
              <ProgressRing 
                value={result.confidence * 100} 
                size={140} 
                strokeWidth={10} 
                color={result.status === "HEALTHY" ? "var(--eco-green)" : "var(--accent)"} 
              />
              <div className="space-y-1">
                 <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">AI_Confidence</p>
                 <h4 className="text-2xl font-bold">{(result.confidence * 100).toFixed(1)}%</h4>
              </div>
           </div>

           <div className="md:col-span-8 space-y-6">
              <div className="space-y-2">
                 <div className="flex items-center gap-3">
                    <div className={cn("p-2 rounded-xl", config.bg, config.color)}>
                       <config.icon size={24} />
                    </div>
                    <Badge variant="outline" className={cn("border-current text-current font-bold uppercase tracking-widest h-8 px-4", config.color)}>
                       {config.label}
                    </Badge>
                 </div>
                 <h3 className="text-2xl font-bold tracking-tight">Diagnostic Analysis Complete</h3>
                 <p className="text-muted-foreground leading-relaxed italic">"{config.details}"</p>
              </div>

              <div className="space-y-4">
                 <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">AI_Recommendations</p>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {result.recommendations.map((rec, i) => (
                       <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/5 flex gap-3 group hover:border-primary/30 transition-all">
                          <ArrowRight className="text-primary mt-0.5 group-hover:translate-x-1 transition-transform" size={16} />
                          <span className="text-sm font-medium leading-tight">{rec}</span>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </Card>

      <div className="flex gap-4">
         <Button className="flex-1 rounded-2xl h-14 shadow-glow gap-2">
            <Zap size={20} /> EXECUTE_RECOVERY_PROTOCOL
         </Button>
         <Button variant="outline" className="flex-1 rounded-2xl h-14 glass">
            GENERATE_FULL_REPORT
         </Button>
      </div>
    </div>
  );
}
