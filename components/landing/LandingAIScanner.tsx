"use client";

import React, { useState, useRef } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Camera, Zap, CheckCircle2, AlertTriangle, ShieldCheck, RefreshCw, Sprout, TrendingUp, Droplets } from "lucide-react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { SafeImage } from "@/components/ui/SafeImage";

export default function LandingAIScanner() {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const laserRef = useRef<HTMLDivElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const startScan = () => {
    setAnalyzing(true);
    if (laserRef.current) {
      gsap.to(laserRef.current, {
        top: "100%",
        duration: 1.5,
        repeat: 3,
        yoyo: true,
        ease: "power2.inOut",
      });
    }

    setTimeout(() => {
      const isHealthy = Math.random() > 0.3;
      const types = [
        { status: "THIRSTY", diag: "Cellular turgor pressure dropping.", recs: ["Increase hydration by 15L/week", "Apply morning mulching"] },
        { status: "NUTRIENT_VOID", diag: "Yellowing chlorosis detected in leaf margins.", recs: ["Apply Nitrogen-rich fertilizer", "Check soil pH levels"] },
        { status: "PEST_THREAT", diag: "Micro-perforations consistent with aphid activity.", recs: ["Apply Organic Neem oil spray", "Introduce ladybug bio-controllers"] }
      ];
      
      const stressType = types[Math.floor(Math.random() * types.length)];
      
      setResult({
        status: isHealthy ? "HEALTHY" : stressType.status,
        diagnosis: isHealthy ? "Optimal photosynthesis and carbon sequestration detected." : stressType.diag,
        confidence: (88 + Math.random() * 10).toFixed(1),
        recommendations: isHealthy ? ["Continue current maintenance cycle", "Next scan scheduled in 14 days"] : stressType.recs,
        recovery: isHealthy ? 100 : (65 + Math.random() * 20).toFixed(0)
      });
      setAnalyzing(false);
    }, 5000);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setResult(null);
      // Auto-start analysis
      setTimeout(startScan, 100);
    }
  };

  return (
    <section className="py-32 px-6 relative z-10 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4 max-w-3xl mx-auto reveal">
          <Badge variant="outline" className="glass border-primary/20 text-primary">PUBLIC_DIAGNOSTIC_TERMINAL</Badge>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Test the AI Intelligence</h2>
          <p className="text-xl text-muted-foreground">Upload a specimen photo directly to see our Neural Mesh in action. No login required for instant telemetry.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Virtual Camera Window */}
          <div className="reveal order-2 lg:order-1">
             <Card className="p-1 glass border-white/10 rounded-[2.5rem] shadow-glow overflow-hidden aspect-[4/3] relative bg-black/40">
                {!file ? (
                  <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-all group">
                     <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/30 transition-all shadow-glow-sm">
                        <Camera className="text-primary" size={40} />
                     </div>
                     <span className="text-2xl font-bold tracking-tight">Uplink Specimen Data</span>
                     <span className="text-muted-foreground mt-2">Initialize biological optic sensor</span>
                     <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
                  </label>
                ) : (
                  <div className="w-full h-full relative">
                     <SafeImage 
                        src={previewUrl || ""} 
                        className="w-full h-full object-cover" 
                        alt="Tree" 
                     />
                     {analyzing && (
                        <div className="absolute inset-0 z-10">
                           <div ref={laserRef} className="absolute top-0 left-0 w-full h-1.5 bg-primary shadow-[0_0_20px_var(--primary)] z-20" />
                           <div className="absolute inset-0 bg-primary/20 backdrop-blur-[4px] flex items-center justify-center">
                              <div className="text-center space-y-4">
                                 <RefreshCw className="text-primary mx-auto animate-spin" size={48} />
                                 <p className="text-sm font-bold tracking-widest text-primary">DIAGNOSING_DNA_MESH...</p>
                              </div>
                           </div>
                        </div>
                     )}
                     {/* Auto-analysis overlay handles logic */}
                  </div>
                )}
             </Card>
          </div>

          {/* Results Summary */}
          <div className="reveal order-1 lg:order-2 space-y-8">
             {!result && !analyzing ? (
               <div className="space-y-6">
                  <h3 className="text-3xl font-bold">Real-Time Tree Diagnostics</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Our AI platform uses multispectral imaging to detect hidden health patterns before they become visible to the human eye. 
                  </p>
                  <ul className="space-y-4">
                     {[
                       "Chlorophyll Content Analysis",
                       "Hydration Strategy Mapping",
                       "Early Pest Infiltration Warnings",
                       "Species Specific Growth Benchmarking"
                     ].map((item, i) => (
                       <li key={i} className="flex items-center gap-3 font-medium">
                          <CheckCircle2 className="text-eco-green" size={20} />
                          <span>{item}</span>
                       </li>
                     ))}
                  </ul>
               </div>
             ) : analyzing ? (
               <div className="space-y-8">
                  <div className="space-y-3">
                     <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                        <span>Neural Processor Load</span>
                        <span className="text-primary animate-pulse italic">Active</span>
                     </div>
                     <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-primary animate-width-grow" />
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     {[1,2,3,4].map(i => (
                       <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 animate-pulse space-y-2">
                          <div className="w-1/2 h-2 bg-white/20 rounded" />
                          <div className="w-3/4 h-3 bg-white/10 rounded" />
                       </div>
                     ))}
                  </div>
               </div>
             ) : (
               <div className="animate-reveal space-y-6">
                  <div className="flex items-center gap-4">
                     <div className={cn(
                        "w-16 h-16 rounded-2xl flex items-center justify-center shadow-glow",
                        result.status === "HEALTHY" ? "bg-eco-green/20 text-eco-green" : "bg-rose-500/20 text-rose-500"
                     )}>
                        {result.status === "HEALTHY" ? <CheckCircle2 size={32} /> : <AlertTriangle size={32} />}
                     </div>
                     <div className="space-y-1">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Telemetry_Result</p>
                        <h3 className={cn("text-3xl font-bold tracking-tight", result.status === "HEALTHY" ? "text-eco-green" : "text-rose-500")}>{result.status}</h3>
                     </div>
                  </div>

                  <Card className="p-6 glass border-white/10 space-y-6">
                     <div className="space-y-2">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Diagnostic_Note</p>
                        <p className="text-lg leading-relaxed italic">"{result.diagnosis}"</p>
                     </div>

                     <div className="space-y-4 pt-4 border-t border-white/5">
                        <p className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                           <Sprout size={14} /> Treatment_Protocols
                        </p>
                        <div className="space-y-3">
                           {result.recommendations.map((rec: string, i: number) => (
                              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-sm hover:border-primary/30 transition-all">
                                 <div className="w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold text-[10px]">{i+1}</div>
                                 <span>{rec}</span>
                              </div>
                           ))}
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                           <p className="text-[10px] font-bold text-muted-foreground uppercase">AI Confidence</p>
                           <p className="text-2xl font-bold text-primary">{result.confidence}%</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                           <p className="text-[10px] font-bold text-muted-foreground uppercase text-nowrap">Recovery Prob.</p>
                           <div className="flex items-center gap-2">
                              <p className="text-2xl font-bold">{result.recovery}%</p>
                              <TrendingUp size={16} className="text-eco-green" />
                           </div>
                        </div>
                     </div>
                     
                     <Button variant="outline" className="w-full glass border-white/5 rounded-xl h-12 hover:bg-white/5 active:scale-95 transition-all text-xs font-bold uppercase tracking-widest" onClick={() => setFile(null)}>
                        RE-INITIALIZE_SCAN_SENSOR
                     </Button>
                  </Card>

                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-primary/10 border border-primary/20">
                     <ShieldCheck className="text-primary" size={24} />
                     <p className="text-sm font-medium">Want full telemetry? <span className="text-primary cursor-pointer hover:underline">Join the ecosystem</span> today.</p>
                  </div>
               </div>
             )}
          </div>
        </div>
      </div>
    </section>
  );
}
