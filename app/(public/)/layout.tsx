"use client";

import * as React from "react";
import Link from "next/link";
import { Trees } from "lucide-react";
import { Button } from "@/components/ui/Button";

function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <nav className="max-w-7xl mx-auto glass rounded-2xl px-6 py-3 flex items-center justify-between border-white/10 shadow-glow">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-primary-gradient rounded-lg flex items-center justify-center shadow-glow group-hover:rotate-12 transition-transform duration-300">
            <Trees size={18} className="text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight bg-primary-gradient bg-clip-text text-transparent">VrikshRakshak</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground/70">
          <Link href="#problem" className="hover:text-primary transition-colors">Problem</Link>
          <Link href="#solution" className="hover:text-primary transition-colors">Solution</Link>
          <Link href="#impact" className="hover:text-primary transition-colors">Impact</Link>
          <Link href="#community" className="hover:text-primary transition-colors">Community</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" size="sm">Login</Button>
          </Link>
          <Link href="/signup">
            <Button variant="primary" size="sm" className="rounded-xl shadow-glow">Join Us</Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/30">
      <Navbar />
      <main>{children}</main>
      <footer className="py-12 px-6 border-t border-white/5 bg-card/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Trees size={24} className="text-primary" />
            <span className="font-bold text-xl tracking-tight">VrikshRakshak</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 VrikshRakshak AI. Monitoring 2.4M+ Trees globally.</p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-primary">Privacy</Link>
            <Link href="#" className="hover:text-primary">Terms</Link>
            <Link href="#" className="hover:text-primary">Github</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
