"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { 
  Users, 
  GraduationCap, 
  ShieldCheck, 
  Heart, 
  User, 
  Building2, 
  MapPin, 
  Bell, 
  Moon, 
  Sun,
  CheckCircle2,
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import Link from "next/link";

type Role = "student" | "ngo" | "admin" | "volunteer" | null;

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<Role>(null);
  const [profile, setProfile] = useState({ name: "", bio: "", avatar: "" });
  const [org, setOrg] = useState({ name: "", mission: "" });
  const [permissions, setPermissions] = useState({ location: false, notifications: false });
  const [darkMode, setDarkMode] = useState(true);

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const stepVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
       {/* Ambient background glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="w-full max-w-2xl relative z-10">
        <div className="mb-12 flex justify-between items-center px-4">
           {Array.from({ length: 5 }).map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 flex-1 mx-1 rounded-full transition-all duration-500 ${
                  step > i ? "bg-primary shadow-glow" : "bg-white/10"
                }`} 
              />
           ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" {...stepVariants} className="space-y-8">
              <div className="text-center space-y-2">
                <Badge variant="outline" className="glass border-primary/20 text-primary uppercase tracking-widest">Step 01 :: Identity_Select</Badge>
                <h2 className="text-4xl font-bold tracking-tight">Choose Your Role</h2>
                <p className="text-muted-foreground">Select how you want to interact with the VrikshRakshak network.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: "student", label: "Student", icon: GraduationCap, color: "text-blue-500", desc: "Adopt local trees & earn credits." },
                  { id: "ngo", label: "NGO Entity", icon: Heart, color: "text-rose-500", desc: "Manage large reforestation zones." },
                  { id: "admin", label: "System Admin", icon: ShieldCheck, color: "text-indigo-500", desc: "Oversee data and sensor networks." },
                  { id: "volunteer", label: "Volunteer", icon: Users, color: "text-eco-green", desc: "Contribute to local tree health." }
                ].map((item) => (
                  <Card 
                    key={item.id}
                    onClick={() => setRole(item.id as Role)}
                    className={`p-6 cursor-pointer glass border-white/10 hover:border-primary/50 transition-all group ${
                      role === item.id ? "bg-primary/10 border-primary ring-1 ring-primary" : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl bg-white/5 group-hover:scale-110 transition-transform ${item.color}`}>
                        <item.icon size={24} />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-bold">{item.label}</h3>
                        <p className="text-xs text-muted-foreground tracking-tight">{item.desc}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              <Button onClick={nextStep} disabled={!role} className="w-full h-14 rounded-2xl text-lg shadow-glow">
                CONTINUE_IDENTITY_SETUP
              </Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" {...stepVariants} className="space-y-8">
              <div className="text-center space-y-2">
                <Badge variant="outline" className="glass border-primary/20 text-primary uppercase tracking-widest">Step 02 :: Profile_Config</Badge>
                <h2 className="text-4xl font-bold tracking-tight">Personal Identity</h2>
                <p className="text-muted-foreground">Tell us about your digital footprint.</p>
              </div>
              <Card className="p-8 glass border-white/10 space-y-6">
                 <div className="space-y-2">
                    <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest ml-1">Universal_Name</label>
                    <Input 
                      placeholder="e.g. Alex Rivera" 
                      value={profile.name}
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest ml-1">Protector_Bio</label>
                    <textarea 
                      className="w-full h-32 bg-accent/20 border border-white/10 rounded-2xl p-4 focus:outline-none focus:ring-1 focus:ring-primary text-sm font-medium transition-all"
                      placeholder="I want to save the planet by..."
                      value={profile.bio}
                      onChange={(e) => setProfile({...profile, bio: e.target.value})}
                    />
                 </div>
              </Card>
              <div className="flex gap-4">
                 <Button onClick={prevStep} variant="ghost" className="h-14 rounded-2xl flex-1 glass">BACK</Button>
                 <Button onClick={nextStep} disabled={!profile.name} className="h-14 rounded-2xl flex-[2] shadow-glow">NEXT_STEP</Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" {...stepVariants} className="space-y-8">
              <div className="text-center space-y-2">
                <Badge variant="outline" className="glass border-primary/20 text-primary uppercase tracking-widest">Step 03 :: Org_Affiliation</Badge>
                <h2 className="text-4xl font-bold tracking-tight">Organization Details</h2>
                <p className="text-muted-foreground">Connect your entity to the global registry.</p>
              </div>
              <Card className="p-8 glass border-white/10 space-y-6">
                 <div className="space-y-2">
                    <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest ml-1">Organization_Registry_Name</label>
                    <Input 
                      placeholder="e.g. Green Earth Foundation" 
                      value={org.name}
                      onChange={(e) => setOrg({...org, name: e.target.value})}
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest ml-1">Mission_Statement</label>
                    <Input 
                      placeholder="To monitor 1M trees by 2030..." 
                      value={org.mission}
                      onChange={(e) => setOrg({...org, mission: e.target.value})}
                    />
                 </div>
              </Card>
              <div className="flex gap-4">
                 <Button onClick={prevStep} variant="ghost" className="h-14 rounded-2xl flex-1 glass">BACK</Button>
                 <Button onClick={nextStep} className="h-14 rounded-2xl flex-[2] shadow-glow">INITIALIZE_SYNC</Button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="step4" {...stepVariants} className="space-y-8">
              <div className="text-center space-y-2">
                <Badge variant="outline" className="glass border-primary/20 text-primary uppercase tracking-widest">Step 04 :: Permission_Matrix</Badge>
                <h2 className="text-4xl font-bold tracking-tight">Access Permissions</h2>
                <p className="text-muted-foreground">Authorize the system to access local telemetry.</p>
              </div>
              <div className="space-y-4">
                 {[
                   { id: "location", label: "Geo-Spatial Telemetry", icon: MapPin, desc: "Required for locating nearby trees.", enabled: permissions.location },
                   { id: "notifications", label: "Neural Alerts", icon: Bell, desc: "Critical health updates & impact alerts.", enabled: permissions.notifications }
                 ].map((p) => (
                   <Card key={p.id} className="p-6 glass border-white/10 flex items-center justify-between group transition-all">
                      <div className="flex items-center gap-4">
                         <div className="p-3 rounded-xl bg-white/5 text-primary group-hover:scale-110 transition-transform"><p.icon size={24} /></div>
                         <div className="space-y-1">
                            <h3 className="font-bold">{p.label}</h3>
                            <p className="text-xs text-muted-foreground leading-tight tracking-tight">{p.desc}</p>
                         </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant={p.enabled ? "primary" : "outline"}
                        onClick={() => setPermissions({...permissions, [p.id]: !p.enabled})}
                        className="rounded-xl w-24 h-10"
                      >
                         {p.enabled ? "ACTIVE" : "GRANT"}
                      </Button>
                   </Card>
                 ))}
              </div>
              <div className="flex gap-4 pt-4">
                 <Button onClick={prevStep} variant="ghost" className="h-14 rounded-2xl flex-1 glass">BACK</Button>
                 <Button onClick={nextStep} className="h-14 rounded-2xl flex-[2] shadow-glow uppercase">Confirm_Protocols</Button>
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div key="step5" {...stepVariants} className="space-y-8 text-center">
              <div className="space-y-2">
                <Badge variant="outline" className="glass border-primary/20 text-primary uppercase tracking-widest">Step 05 :: Final_Preference</Badge>
                <h2 className="text-4xl font-bold tracking-tight">System Aesthetic</h2>
                <p className="text-muted-foreground">Set your visual synthesis preference.</p>
              </div>
              
              <div className="flex justify-center gap-8 py-12">
                 <Card 
                  onClick={() => setDarkMode(true)}
                  className={`p-10 cursor-pointer glass border-white/10 transition-all ${darkMode ? "ring-2 ring-primary shadow-glow bg-primary/10" : ""}`}
                 >
                    <Moon size={48} className={darkMode ? "text-primary" : "text-muted-foreground"} />
                    <p className={`mt-4 font-bold ${darkMode ? "text-primary" : ""}`}>DARK_OPS</p>
                 </Card>
                 <Card 
                  onClick={() => setDarkMode(false)}
                  className={`p-10 cursor-pointer glass border-white/10 transition-all ${!darkMode ? "ring-2 ring-primary shadow-glow bg-primary/10" : ""}`}
                 >
                    <Sun size={48} className={!darkMode ? "text-primary" : "text-muted-foreground"} />
                    <p className={`mt-4 font-bold ${!darkMode ? "text-primary" : ""}`}>LIGHT_BEAM</p>
                 </Card>
              </div>

              <div className="space-y-4 pt-8">
                 <Link href="/dashboard">
                    <Button className="w-full h-16 rounded-2xl text-xl shadow-glow gap-3 font-bold">
                       <CheckCircle2 size={24} /> INITIALIZE_DASHBOARD
                    </Button>
                 </Link>
                 <p className="text-xs text-muted-foreground uppercase tracking-[0.2em] font-bold">Protocol Sync Complete :: Secure Session Active</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
