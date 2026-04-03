"use client";

import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { 
  MapPin, 
  Leaf, 
  User, 
  Camera, 
  RefreshCw, 
  CheckCircle2, 
  X,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface RegisterTreeFormProps {
  onCancel: () => void;
  onSuccess: (data: any) => void;
}

export function RegisterTreeForm({ onCancel, onSuccess }: RegisterTreeFormProps) {
  const [loading, setLoading] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [treeId, setTreeId] = useState("");
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [species, setSpecies] = useState("");
  const [caretaker, setCaretaker] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Generate Unique Tree ID
  useEffect(() => {
    const random = Math.floor(1000 + Math.random() * 9000);
    setTreeId(`T-${random}`);
  }, []);

  const captureGPS = () => {
    setGpsLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setGpsLoading(false);
        },
        (error) => {
          console.error("GPS Error:", error);
          setGpsLoading(false);
          alert("Failed to capture GPS. Please enable permissions.");
        },
        { enableHighAccuracy: true }
      );
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API Call
    setTimeout(() => {
      onSuccess({
        id: treeId,
        species,
        caretaker,
        coords,
        timestamp: new Date().toISOString()
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <Card className="max-w-2xl w-full glass border-white/10 shadow-glow relative overflow-hidden p-8 space-y-8 animate-in fade-in zoom-in duration-300">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <Badge variant="outline" className="glass border-primary/20 text-primary uppercase tracking-widest">Protocol :: Register_Specimen</Badge>
          <h2 className="text-3xl font-bold tracking-tight">Geo-Tagging Entry</h2>
          <p className="text-muted-foreground text-sm font-medium">Initialize biological tracking for <span className="font-mono text-primary">{treeId}</span></p>
        </div>
        <button onClick={onCancel} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
          <X size={20} className="text-muted-foreground" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Species Input */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] ml-1">Biological_Species</label>
            <div className="relative">
              <Leaf className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" size={16} />
              <Input 
                placeholder="e.g. Silver Birch" 
                className="pl-10" 
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Caretaker Input */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] ml-1">Assigned_Caretaker</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-accent" size={16} />
              <Input 
                placeholder="Protector ID or Name" 
                className="pl-10" 
                value={caretaker}
                onChange={(e) => setCaretaker(e.target.value)}
                required
              />
            </div>
          </div>

          {/* GPS Capture */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] ml-1">Geo_Spatial_Coordinates</label>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-3">
              {coords ? (
                <div className="flex items-center justify-between">
                  <div className="font-mono text-xs text-eco-green">
                    LAT: {coords.lat.toFixed(6)}<br />
                    LNG: {coords.lng.toFixed(6)}
                  </div>
                  <CheckCircle2 size={20} className="text-eco-green" />
                </div>
              ) : (
                <p className="text-xs text-muted-foreground italic">GPS Signal Pending...</p>
              )}
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                className="w-full gap-2 text-[10px] h-10 border-primary/20 hover:bg-primary/5"
                onClick={captureGPS}
                disabled={gpsLoading}
              >
                {gpsLoading ? <RefreshCw size={14} className="animate-spin" /> : <MapPin size={14} />}
                {gpsLoading ? "INITIALIZING_GPS..." : coords ? "RE-CALIBRATE_GPS" : "CAPTURE_CURRENT_GPS"}
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Photo Upload */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] ml-1">Visual_Record (Photo)</label>
            <div 
              className={cn(
                "h-48 rounded-2xl border-2 border-dashed border-white/10 bg-white/5 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-primary/50 transition-all overflow-hidden relative group",
                photoPreview && "border-solid border-primary/30"
              )}
              onClick={() => document.getElementById("photo-upload")?.click()}
            >
              {photoPreview ? (
                <>
                  <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Camera size={32} className="text-white" />
                  </div>
                </>
              ) : (
                <>
                  <Camera size={32} className="text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Upload_Specimen_Image</span>
                </>
              )}
              <input 
                id="photo-upload" 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handlePhotoChange}
              />
            </div>
          </div>

          {/* QR Code Preview */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] ml-1">Unique_System_QR</label>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
              <div className="bg-white p-2 rounded-xl shadow-glow min-w-[80px]">
                <QRCodeSVG value={`https://vrikshrakshak.ai/trees/${treeId}`} size={80} level="H" />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Protocol-ID</p>
                <p className="font-mono text-lg font-bold text-primary">{treeId}</p>
                <p className="text-[8px] text-muted-foreground uppercase leading-tight font-medium opacity-60">Encoded telemetry for encrypted botanical tagging.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 pt-4 flex gap-4">
          <Button type="button" variant="ghost" className="flex-1 h-14 rounded-2xl glass" onClick={onCancel}>
            ABORT_SUBMISSION
          </Button>
          <Button type="submit" className="flex-[2] h-14 rounded-2xl text-lg shadow-glow gap-2" disabled={loading || !coords}>
            {loading ? <RefreshCw className="animate-spin" size={20} /> : <CheckCircle2 size={20} />}
            {loading ? "REGISTERING_SPECIMEN..." : "COMPLETE_REGISTRATION"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
