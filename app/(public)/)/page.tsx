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
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Hero3D />
        <div ref={heroTextRef} className="relative z-10 text-center space-y-8 max-w-4xl px-6">
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
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50 text-muted-foreground">
          <div className="w-1 h-12 rounded-full bg-gradient-to-b from-primary to-transparent" />
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="reveal space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
               Our Forests are <span className="text-rose-500">Dying in Silence.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Manual monitoring is impossible at scale. Trees are lost to pests, dehydration, and illegal logging long before humans detect the signs. 
              We've lost 420 million hectares of forest since 1990.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8">
               <div className="space-y-1">
                  <p className="text-4xl font-bold text-rose-500">420M</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">Hectares Lost</p>
               </div>
               <div className="space-y-1">
                  <p className="text-4xl font-bold text-rose-500">85%</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">Late Detection Rate</p>
               </div>
            </div>
          </div>
          <div className="reveal glass rounded-3xl p-1 border-rose-500/20 shadow-glow overflow-hidden h-[400px] flex items-center justify-center bg-rose-500/5">
             <ShieldCheck size={120} className="text-rose-500/20 animate-pulse" />
          </div>
        </div>
      </section>

      {/* AI Detection Section */}
      <section className="py-32 px-6 bg-accent/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary-gradient opacity-5 blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center space-y-8 mb-20">
          <h2 className="reveal text-4xl md:text-5xl font-bold tracking-tight">AI::Health_Diagnostic_Matrix</h2>
          <p className="reveal text-lg text-muted-foreground max-w-2xl mx-auto">
            Our neural mesh network processes multispectral imagery and acoustic telemetry to diagnose individual tree health in real-time.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Multispectral Scanning", desc: "Detection of chlorophyll decay and nutrient deficiencies using satellite telemetry.", icon: Zap },
            { title: "Acoustic Bio-Detect", desc: "Identify pest infestations by monitoring structural vibration and internal audio frequency.", icon: Activity },
            { title: "Hydrometric Mesh", desc: "Precision soil moisture analysis via low-energy ground sensor networks.", icon: Globe }
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

      {/* NGOs & Volunteers Section */}
      <section id="community" className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
           <Card className="reveal p-10 glass space-y-8 border-primary/20">
              <div className="flex items-center gap-4">
                 <div className="w-14 h-14 bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-500"><Users size={32} /></div>
                 <h3 className="text-3xl font-bold">NGO Enterprise</h3>
              </div>
              <p className="text-lg text-muted-foreground">Manage thousands of saplings across global reforestation zones. Real-time data for donors and transparent impact reporting.</p>
              <Button variant="outline" className="w-full rounded-2xl font-bold">Apply for Grant Access</Button>
           </Card>
           
           <Card className="reveal p-10 glass space-y-8 border-eco-green/20">
              <div className="flex items-center gap-4">
                 <div className="w-14 h-14 bg-eco-green/10 rounded-full flex items-center justify-center text-eco-green"><GraduationCap size={32} /></div>
                 <h3 className="text-3xl font-bold">Student Volunteers</h3>
              </div>
              <p className="text-lg text-muted-foreground">Adopt a local tree, monitor its growth via mobile app, and earn "Protector Points" for university credits or career paths.</p>
              <Button variant="outline" className="w-full rounded-2xl font-bold border-eco-green/20 text-eco-green hover:bg-eco-green/10">Become a Protector</Button>
           </Card>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-32 px-6">
         <div className="max-w-4xl mx-auto glass rounded-[3rem] p-16 text-center space-y-8 border-primary/20 relative overflow-hidden shadow-glow">
            <div className="absolute top-0 right-0 p-8 opacity-10"><Heart size={120} className="text-primary" /></div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Ready to Secure our Future?</h2>
            <p className="text-xl text-muted-foreground max-w-xl mx-auto">Join 12,000+ Protectors monitoring forests across 6 continents.</p>
            <Button size="lg" className="rounded-2xl px-12 py-8 text-xl shadow-glow">Initialize System Onboarding</Button>
         </div>
      </section>
    </div>
  );
}
