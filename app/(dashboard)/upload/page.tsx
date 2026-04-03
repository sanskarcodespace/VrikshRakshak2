"use client";

import { useState, useRef } from "react";
import { DashboardContainer } from "@/components/layout/DashboardContainer";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Upload, Camera, CheckCircle2, AlertTriangle, ShieldCheck, Zap, Activity } from "lucide-react";
import { useNotificationStore } from "@/lib/store/notification-store";
import gsap from "gsap";
import { cn } from "@/lib/utils";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const addNotification = useNotificationStore(state => state.addNotification);
  
  const scanRef = useRef<HTMLDivElement>(null);
  const laserRef = useRef<HTMLDivElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setResult(null);
    }
  };

  const startAnalysis = () => {
    setAnalyzing(true);
    
    // Animation
    gsap.to(laserRef.current, {
      top: "100%",
      duration: 2,
      repeat: 3,
      yoyo: true,
      ease: "power2.inOut",
    });

    // Mock AI Logic
    setTimeout(() => {
      const isHealthy = Math.random() > 0.4;
      const confidence = 85 + Math.random() * 10;
      
      const newResult = {
         status: isHealthy ? "HEALTHY" : "CRITICAL_STRESS",
         diagnosis: isHealthy ? "Optimal chlorophyll levels detected." : "Early signs of leaf wilt and dehydration.",
         confidence: confidence.toFixed(1),
         id: "T-" + Math.floor(1000 + Math.random() * 9000)
      };
      
      setResult(newResult);
      setAnalyzing(false);
      
      // Trigger Notification
      addNotification({
        type: isHealthy ? "SUCCESS" : "CRITICAL",
        title: isHealthy ? "Diagnostic Complete" : "Health Alert Triggered",
        category: "Field Intelligence",
        message: `Specimen ${newResult.id} analysis: ${newResult.diagnosis} (Confidence: ${newResult.confidence}%)`
      });

    }, 6000);
  };

  return (
    <DashboardContainer>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-1">
           <Badge variant="outline" className="glass border-primary/20 text-primary mb-2">FIELD_INTEL_UPLINK</Badge>
           <h2 className="text-3xl font-bold tracking-tight">Diagnostic Payload Upload</h2>
           <p className="text-muted-foreground font-medium">Synchronize field imagery with the AI Health Mesh.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {/* Upload Zone */}
           <Card className="p-1 glass border-white/10 aspect-square relative overflow-hidden flex flex-col">
              {!file ? (
                <label className="flex-1 flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-colors group">
                   <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Camera className="text-primary" size={32} />
                   </div>
                   <p className="font-bold text-lg">Initialize Camera</p>
                   <p className="text-sm text-muted-foreground">or drag biological photographic data here</p>
                   <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                </label>
              ) : (
                <div className="flex-1 relative bg-black/40">
                   <img 
                      src={URL.createObjectURL(file)} 
                      className="w-full h-full object-cover opacity-60" 
                      alt="Preview" 
                   />
                   
                   {analyzing && (
                      <div className="absolute inset-0 z-10 overflow-hidden">
                         <div 
                            ref={laserRef}
                            className="absolute top-0 left-0 w-full h-1 bg-primary shadow-[0_0_15px_var(--primary)] z-20" 
                         />
                         <div className="absolute inset-0 bg-primary/10 backdrop-blur-[2px]" />
                         <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center space-y-4 animate-pulse">
                               <Zap className="text-primary mx-auto" size={48} fill="currentColor" />
                               <p className="text-sm font-bold tracking-[0.2em] text-primary">SCANNING_PROTOCOLS_V.8</p>
                            </div>
                         </div>
                      </div>
                   )}

                   {!analyzing && !result && (
                      <div className="absolute bottom-6 left-0 right-0 px-6">
                         <Button onClick={startAnalysis} className="w-full h-14 rounded-2xl shadow-glow text-lg gap-3">
                            <Zap size={20} fill="currentColor" /> START_AI_DIAGNOSTIC
                         </Button>
                      </div>
                   )}
                </div>
              )}
           </Card>

           {/* Analysis Panel */}
           <div className="space-y-6">
              <Card className="p-8 glass border-white/10 h-full min-h-[300px] flex flex-col justify-center relative overflow-hidden">
                 {!result && !analyzing && (
                    <div className="text-center space-y-4">
                       <ShieldCheck className="text-muted-foreground/20 mx-auto" size={80} />
                       <div className="space-y-1">
                          <p className="text-lg font-bold text-muted-foreground">Waiting for Data Uplink</p>
                          <p className="text-sm text-muted-foreground/60">Upload a specimen photo to initiate analysis.</p>
                       </div>
                    </div>
                 )}

                 {analyzing && (
                    <div className="space-y-8">
                       <div className="space-y-2">
                          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                             <span>Neural Mesh Convergence</span>
                             <span className="text-primary italic animate-pulse">Processing...</span>
                          </div>
                          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                             <div className="h-full bg-primary animate-width-grow" />
                          </div>
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 animate-pulse">
                             <div className="w-12 h-2 bg-white/20 rounded" />
                             <div className="w-20 h-4 bg-white/10 rounded" />
                          </div>
                          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 animate-pulse">
                             <div className="w-12 h-2 bg-white/20 rounded" />
                             <div className="w-20 h-4 bg-white/10 rounded" />
                          </div>
                       </div>
                    </div>
                 )}

                 {result && (
                    <div className="space-y-6 animate-reveal">
                       <div className="flex items-center gap-4">
                          <div className={cn(
                             "w-16 h-16 rounded-2xl flex items-center justify-center shadow-glow",
                             result.status === "HEALTHY" ? "bg-eco-green/20 text-eco-green" : "bg-rose-500/20 text-rose-500"
                          )}>
                             {result.status === "HEALTHY" ? <CheckCircle2 size={32} /> : <AlertTriangle size={32} />}
                          </div>
                          <div className="space-y-1">
                             <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">Diagnostic_Status</p>
                             <h3 className={cn(
                                "text-2xl font-bold tracking-tight",
                                result.status === "HEALTHY" ? "text-eco-green" : "text-rose-500"
                             )}>{result.status}</h3>
                          </div>
                       </div>

                       <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                          <div className="space-y-1">
                             <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">AI_Observation</p>
                             <p className="text-sm leading-relaxed italic">"{result.diagnosis}"</p>
                          </div>
                          <div className="flex items-center justify-between pt-4 border-t border-white/5">
                             <div className="space-y-1">
                                <p className="text-[10px] font-bold text-muted-foreground uppercase">Confidence</p>
                                <p className="text-xl font-bold text-primary">{result.confidence}%</p>
                             </div>
                             <div className="space-y-1 text-right">
                                <p className="text-[10px] font-bold text-muted-foreground uppercase">Specimen_ID</p>
                                <p className="text-xl font-bold">{result.id}</p>
                             </div>
                          </div>
                       </div>

                       <Button variant="outline" className="w-full rounded-xl glass py-6" onClick={() => setFile(null)}>
                          RESET_DIAGNOSTIC_TERMINAL
                       </Button>
                    </div>
                 )}
              </Card>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-primary/5 border border-primary/10">
                 <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                    <Zap size={20} className="text-primary" />
                 </div>
                 <p className="text-xs font-medium leading-relaxed text-muted-foreground">
                   AI Diagnostic v4.2 is now using <span className="text-primary font-bold">Bio-Neural Sync</span> for 99.2% accuracy in chlorophyll decay detection.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </DashboardContainer>
  );
}
