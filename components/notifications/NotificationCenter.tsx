"use client";

import { useState, useEffect } from "react";
import { 
  Bell, 
  X, 
  Droplets, 
  AlertTriangle, 
  CheckCircle2, 
  Info,
  ExternalLink,
  Trash2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Notification } from "@/lib/services/notificationService";

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "CRITICAL",
      title: "Hydration Alert",
      message: "Specimen T-845 (English Oak) has exceeded its 6-day watering threshold.",
      timestamp: new Date().toISOString(),
      read: false,
      treeId: "T-845",
      actionLabel: "Water Now"
    },
    {
      id: "2",
      type: "WARNING",
      title: "Growth Anomaly",
      message: "T-843 showing 15% slower growth than localized average.",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      read: false,
      treeId: "T-843"
    },
    {
      id: "3",
      type: "INFO",
      title: "Sync Complete",
      message: "Satellite telemetry for Sector 7-A updated successfully.",
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2.5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all relative group"
      >
        <Bell size={20} className={cn("text-muted-foreground group-hover:text-white transition-colors", unreadCount > 0 && "animate-wiggle")} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-background shadow-glow-sm">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[80]"
              onClick={() => setIsOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.95, y: 10, filter: "blur(10px)" }}
              className="absolute right-0 mt-4 w-[400px] max-h-[600px] glass border-white/10 rounded-3xl shadow-2xl z-[90] overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
                 <div className="space-y-1">
                    <h3 className="font-bold text-lg">Alert Console</h3>
                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Real-time Telemetry Notifications</p>
                 </div>
                 <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/5 rounded-lg">
                    <X size={18} />
                 </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                {notifications.length === 0 ? (
                  <div className="py-12 text-center space-y-3">
                     <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto">
                        <CheckCircle2 size={32} className="text-muted-foreground" />
                     </div>
                     <p className="text-sm font-medium text-muted-foreground">System state: Nominal. No active alerts.</p>
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div 
                      key={n.id} 
                      className={cn(
                        "p-4 rounded-2xl border transition-all group relative",
                        n.read ? "bg-white/2 border-white/5 opacity-60" : "bg-white/5 border-primary/20 shadow-glow-sm"
                      )}
                      onMouseEnter={() => !n.read && markRead(n.id)}
                    >
                       <div className="flex gap-4">
                          <div className={cn(
                             "p-2 rounded-xl h-fit",
                             n.type === "CRITICAL" ? "bg-rose-500/10 text-rose-500" :
                             n.type === "WARNING" ? "bg-amber-500/10 text-amber-500" : "bg-primary/10 text-primary"
                          )}>
                             {n.type === "CRITICAL" ? <Droplets size={18} /> : 
                              n.type === "WARNING" ? <AlertTriangle size={18} /> : <Info size={18} />}
                          </div>
                          <div className="space-y-2 flex-1">
                             <div className="flex justify-between items-start">
                                <h4 className="text-sm font-bold leading-tight">{n.title}</h4>
                                <span className="text-[10px] text-muted-foreground font-mono">
                                   {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                             </div>
                             <p className="text-xs text-muted-foreground leading-relaxed">{n.message}</p>
                             
                             <div className="flex items-center gap-3 pt-1">
                                {n.treeId && (
                                  <Link href={`/trees/${n.treeId}`}>
                                    <Button variant="ghost" className="h-auto p-0 text-[10px] font-bold uppercase tracking-widest text-primary gap-1 hover:bg-transparent hover:underline">
                                       Examine Specimen <ExternalLink size={10} />
                                    </Button>
                                  </Link>
                                )}
                                {n.actionLabel && (
                                  <Button size="sm" className="h-7 text-[10px] rounded-lg px-3 shadow-glow">
                                     {n.actionLabel}
                                  </Button>
                                )}
                             </div>
                          </div>
                       </div>
                       <button 
                        onClick={() => removeNotification(n.id)}
                        className="absolute top-2 right-2 p-1.5 opacity-0 group-hover:opacity-100 hover:bg-rose-500/10 hover:text-rose-500 rounded-lg transition-all"
                       >
                          <Trash2 size={12} />
                       </button>
                    </div>
                  ))
                )}
              </div>

              <div className="p-4 border-t border-white/5 bg-white/2">
                 <Link href="/notifications">
                    <Button variant="ghost" className="w-full h-12 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-primary/10 hover:text-primary">
                       Access History Archives
                    </Button>
                 </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
