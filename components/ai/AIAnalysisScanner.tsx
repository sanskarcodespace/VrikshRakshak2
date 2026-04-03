"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Scan, 
  Camera, 
  RefreshCw, 
  Search, 
  CheckCircle2, 
  AlertCircle,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface AIAnalysisScannerProps {
  onAnalysisComplete: (result: any) => void;
}

export function AIAnalysisScanner({ onAnalysisComplete }: AIAnalysisScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState<string | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const startScan = () => {
    if (!image) return;
    setIsScanning(true);
    setProgress(0);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isScanning && progress < 100) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + Math.random() * 15;
          return next > 100 ? 100 : next;
        });
      }, 300);
    } else if (isScanning && progress >= 100) {
      setTimeout(() => {
        setIsScanning(false);
        const results = [
          { status: "HEALTHY", confidence: 0.98, recommendations: ["No action required.", "Continue current irrigation."] },
          { status: "NEEDS_WATER", confidence: 0.92, recommendations: ["Increase hydration by 15%.", "Check soil moisture sensor."] },
          { status: "DISEASE_SUSPECTED", confidence: 0.85, recommendations: ["Inspect for leaf spots.", "Apply biological fungicide."] },
          { status: "LOW_SUNLIGHT", confidence: 0.78, recommendations: ["Prune surrounding overgrowth.", "Consider reflective mulch."] },
        ];
        onAnalysisComplete(results[Math.floor(Math.random() * results.length)]);
      }, 800);
    }
    return () => clearInterval(interval);
  }, [isScanning, progress, onAnalysisComplete]);

  return (
    <Card className="p-8 glass border-white/10 space-y-8 relative overflow-hidden">
      <div className="space-y-1">
        <Badge variant="outline" className="glass border-accent/20 text-accent uppercase tracking-widest">Core_Module :: AI_Bio_Scanner</Badge>
        <h3 className="text-2xl font-bold tracking-tight">Health Diagnostic Terminal</h3>
      </div>

      <div className="relative aspect-video rounded-3xl bg-accent/5 border border-white/5 overflow-hidden flex items-center justify-center group">
        {image ? (
          <>
            <img src={image} alt="Specimen" className="w-full h-full object-cover" />
            <AnimatePresence>
              {isScanning && (
                <motion.div 
                  initial={{ top: "-10%" }}
                  animate={{ top: "110%" }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-1 bg-accent shadow-glow-cyan z-10"
                />
              )}
            </AnimatePresence>
            <div className={cn(
               "absolute inset-0 bg-accent/20 backdrop-blur-[2px] flex items-center justify-center transition-opacity duration-500",
               isScanning ? "opacity-100" : "opacity-0"
            )}>
               <div className="text-center space-y-4">
                  <div className="relative">
                     <svg className="w-24 h-24 rotate-[-90deg]">
                        <circle 
                          cx="48" cy="48" r="40" 
                          stroke="rgba(255,255,255,0.1)" strokeWidth="4" fill="none" 
                        />
                        <motion.circle 
                          cx="48" cy="48" r="40" 
                          stroke="var(--highlight)" strokeWidth="4" fill="none"
                          strokeDasharray="251.2"
                          strokeDashoffset={251.2 - (251.2 * progress) / 100}
                        />
                     </svg>
                     <div className="absolute inset-0 flex items-center justify-center text-sm font-mono font-bold">
                        {Math.floor(progress)}%
                     </div>
                  </div>
                  <p className="text-xs font-mono uppercase tracking-[0.3em] animate-pulse">Analyzing_Neural_Mesh...</p>
               </div>
            </div>
          </>
        ) : (
          <div 
            className="flex flex-col items-center gap-4 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => document.getElementById("ai-upload")?.click()}
          >
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-accent/50 transition-colors">
               <Camera size={32} className="text-muted-foreground group-hover:text-accent transition-colors" />
            </div>
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Click to Upload Specimen Photo</p>
          </div>
        )}
        <input id="ai-upload" type="file" className="hidden" onChange={handleUpload} />
      </div>

      <div className="flex gap-4">
         <Button 
          variant="outline" 
          className="flex-1 h-12 rounded-2xl glass border-white/5" 
          onClick={() => setImage(null)}
          disabled={isScanning}
         >
            CLEAR_IMAGE
         </Button>
         <Button 
          className="flex-[2] h-12 rounded-2xl shadow-glow gap-2" 
          onClick={startScan}
          disabled={!image || isScanning}
         >
            {isScanning ? <RefreshCw className="animate-spin" size={18} /> : <Scan size={18} />}
            {isScanning ? "PROCESSING..." : "INITIALIZE_DIAGNOSTIC"}
         </Button>
      </div>

      <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
         <div className="p-2 rounded-lg bg-accent/20"><Search size={18} className="text-accent" /></div>
         <p className="text-[10px] text-muted-foreground leading-tight font-medium opacity-60">
            Our neural engine will perform multispectral analysis on the uploaded data to identify leaf chlorophyll patterns and potential pathogen colonies.
         </p>
      </div>
    </Card>
  );
}
