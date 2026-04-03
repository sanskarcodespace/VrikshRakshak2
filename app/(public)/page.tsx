"use client";

import React, { useEffect, useRef } from "react";
import Hero3D from "@/components/landing/Hero3D";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Trees, ShieldCheck, Activity, Globe, Zap, Users, GraduationCap, Heart } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation
      gsap.from(heroTextRef.current?.children || [], {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
      });

      // Scroll Animations
      gsap.utils.toArray(".reveal").forEach((elem: any) => {
        gsap.fromTo(elem, 
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: elem,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative bg-background overflow-hidden">
      <Hero3D />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-20">
        <div ref={heroTextRef} className="text-center space-y-8 max-w-4xl px-6">
          <Badge variant="outline" className="py-2 px-4 glass border-primary/20 text-primary animate-pulse-slow">
            SYSTEM_v4.0 :: GLOBAL_TREE_PROTOCOL_ACTIVE
          </Badge>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter">
            The Future of <span className="bg-primary-gradient bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]">Ecosystem Intelligence</span>
          </h1>
          <p className="text-xl text-muted-foreground/80 max-w-2xl mx-auto font-medium">
            AI-driven reforestation monitoring, health diagnostic telemetry, and geo-spatial impact tracking for a greener planet.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-4">
            <Link href="/signup">
               <Button size="lg" className="rounded-2xl px-12 py-8 text-xl shadow-glow hover:scale-105 active:scale-95 transition-all">
                 Start Monitoring Trees
               </Button>
            </Link>
            <Link href="#impact">
               <Button variant="outline" size="lg" className="rounded-2xl px-12 py-8 text-xl glass hover:bg-white/5 transition-all">
                 Watch System Overview
               </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Problem Section */}
      <section id="problem" className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="reveal space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
               Our Forests are <span className="text-rose-500">Dying in Silence.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Manual monitoring is impossible at scale. Trees are lost to pests, dehydration, and illegal logging long before humans detect the signs. 
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8">
               <div className="space-y-1">
                  <p className="text-4xl font-bold text-rose-500">420M</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest leading-none">Hectares Lost</p>
               </div>
               <div className="space-y-1">
                  <p className="text-4xl font-bold text-rose-500">85%</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest leading-none">Detection Gap</p>
               </div>
            </div>
          </div>
          <div className="reveal glass rounded-3xl p-1 border-rose-500/10 shadow-glow h-[400px] flex items-center justify-center bg-rose-500/5">
             <ShieldCheck size={120} className="text-rose-500/20 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-32 px-6 relative z-10 bg-primary/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="reveal order-2 lg:order-1 glass rounded-3xl p-8 border-primary/10 shadow-glow space-y-4">
             <div className="grid grid-cols-2 gap-4">
                <div className="h-24 bg-white/5 rounded-xl animate-pulse" />
                <div className="h-24 bg-primary/10 rounded-xl animate-pulse" />
                <div className="h-32 col-span-2 bg-white/5 rounded-xl border border-white/5 p-4">
                   <div className="w-full h-2 bg-primary/20 rounded-full overflow-hidden">
                      <div className="w-[70%] h-full bg-primary animate-width-grow" />
                   </div>
                   <p className="text-[10px] mt-2 font-bold text-primary">REAL_TIME_HEALTH_CALIBRATION</p>
                </div>
             </div>
          </div>
          <div className="reveal order-1 lg:order-2 space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
               The <span className="text-primary">Autonomous</span> Guardian.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              VrikshRakshak bridges the physical and digital gap. Our platform automates field-work, tracks individual tree kinetics, and alerts caretakers before stress becomes fatal.
            </p>
            <Link href="/signup">
               <Button className="rounded-xl px-8 shadow-glow-sm">Explore Resolution Matrix</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Impact/Analytics Section */}
      <section id="impact" className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto text-center space-y-12">
           <div className="reveal space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">Global_Impact_Radar</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto font-medium">Visualizing 100% transparent reforestation data. No more guessing, just growth kinetics.</p>
           </div>
           
           <div className="reveal grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { label: "Trees Tracked", value: "2.4M+", icon: Trees, color: "text-primary" },
                { label: "Survival Rate", value: "94.2%", icon: Activity, color: "text-eco-green" },
                { label: "Carbon Offset", value: "128k t", icon: Globe, color: "text-accent" },
                { label: "Alert Latency", value: "< 2min", icon: Zap, color: "text-amber-500" }
              ].map((stat, i) => (
                <Card key={i} className="p-8 glass border-white/5 space-y-4 hover:translate-y-[-8px] transition-all">
                   <stat.icon className={stat.color} size={32} />
                   <div className="space-y-1">
                      <p className="text-3xl font-bold">{stat.value}</p>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                   </div>
                </Card>
              ))}
           </div>

           <Link href="/analytics">
              <Button variant="outline" className="reveal glass border-primary/20 text-primary py-8 px-12 text-xl rounded-2xl hover:bg-primary/5 transition-all mt-12 gap-3">
                 <Activity size={24} /> ACCESS_ENTERPRISE_ANALYTICS
              </Button>
           </Link>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-32 px-6 relative z-10 bg-accent/5">
        <div className="max-w-7xl mx-auto text-center space-y-16">
           <h2 className="reveal text-4xl md:text-5xl font-bold">Collective_Protection</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { name: "NGO Partnerships", icon: Heart },
                { name: "Volunteer Network", icon: Users },
                { name: "Academic Research", icon: GraduationCap },
                { name: "Global Alliances", icon: Globe }
              ].map((item, i) => (
                <div key={i} className="reveal flex flex-col items-center gap-4">
                   <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                      <item.icon size={24} className="text-muted-foreground" />
                   </div>
                   <p className="font-bold text-sm tracking-widest uppercase">{item.name}</p>
                </div>
              ))}
           </div>
           
           <div className="reveal max-w-4xl mx-auto glass p-12 border-white/10 rounded-[3rem] space-y-8 bg-primary/10">
              <h3 className="text-3xl font-bold tracking-tight">Ready to integrate?</h3>
              <p className="text-muted-foreground text-lg">Join 1,200+ organizations building a resilient future.</p>
              <Link href="/signup">
                 <Button size="lg" className="rounded-2xl px-12 py-8 text-xl shadow-glow">JOIN_THE_MOVEMENT</Button>
              </Link>
           </div>
        </div>
      </section>
    </div>
  );
}
