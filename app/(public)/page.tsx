"use client";

import React, { useEffect, useRef } from "react";
import Hero3D from "@/components/landing/Hero3D";
import { Button } from "@/components/ui/Button";
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
            The Future of <span className="bg-primary-gradient bg-clip-text text-transparent">Ecosystem Intelligence</span>
          </h1>
          <p className="text-xl text-muted-foreground/80 max-w-2xl mx-auto font-medium">
            AI-driven reforestation monitoring, health diagnostic telemetry, and geo-spatial impact tracking for a greener planet.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-4">
            <Button size="lg" className="rounded-2xl px-12 py-8 text-xl shadow-glow hover:scale-110 active:scale-95 transition-all">
              Start Monitoring Trees
            </Button>
            <Button variant="outline" size="lg" className="rounded-2xl px-12 py-8 text-xl glass hover:bg-white/5 transition-all">
              Watch System Overview
            </Button>
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

      {/* AI Health Detection Section */}
      <section className="py-32 px-6 bg-accent/5 relative overflow-hidden z-10">
        <div className="max-w-7xl mx-auto text-center space-y-8 mb-20">
          <h2 className="reveal text-4xl md:text-5xl font-bold tracking-tight">AI::Health_Diagnostic_Matrix</h2>
          <p className="reveal text-lg text-muted-foreground max-w-2xl mx-auto">
            Our neural mesh network processes multispectral imagery and acoustic telemetry to diagnose individual tree health in real-time.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Multispectral Scanning", desc: "Detection of chlorophyll decay using satellite telemetry.", icon: Zap },
            { title: "Acoustic Bio-Detect", desc: "Identify pest infestations by monitoring structural vibration.", icon: Activity },
            { title: "Hydrometric Mesh", desc: "Precision soil moisture analysis via sensor networks.", icon: Globe }
          ].map((feature, i) => (
            <Card key={i} className="reveal p-8 space-y-6 glass border-white/5 hover:border-primary/50 group transition-all duration-500">
               <div className="w-16 h-16 rounded-2xl bg-primary-gradient flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                  <feature.icon className="text-white" size={32} />
               </div>
               <h3 className="text-2xl font-bold">{feature.title}</h3>
               <p className="text-muted-foreground leading-relaxed italic">"{feature.desc}"</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
