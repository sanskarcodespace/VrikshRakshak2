import * as React from "react";
import Link from "next/link";
import { Trees } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function PublicNavbar() {
  return (
    <nav className="h-20 flex items-center justify-between px-6 md:px-12 border-b bg-background/50 backdrop-blur-md fixed top-0 w-full z-50">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground">
          <Trees size={24} />
        </div>
        <span className="font-bold text-2xl tracking-tight text-primary">VrikshRakshak</span>
      </Link>
      
      <div className="hidden md:flex items-center gap-8 font-medium">
        <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
        <Link href="#impact" className="hover:text-primary transition-colors">Impact</Link>
        <Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link>
      </div>

      <div className="flex items-center gap-4">
        <Link href="/login">
          <Button variant="ghost">Login</Button>
        </Link>
        <Link href="/signup">
          <Button className="rounded-2xl shadow-soft">Get Started</Button>
        </Link>
      </div>
    </nav>
  );
}

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />
      <main className="pt-20">
        {children}
      </main>
      <footer className="py-12 px-6 border-t bg-card mt-20">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Trees className="text-primary" />
              <span className="font-bold text-xl">VrikshRakshak</span>
            </div>
            <p className="text-sm text-muted-foreground">Protecting our future, one tree at a time.</p>
          </div>
          {/* Footer links placeholders */}
        </div>
      </footer>
    </div>
  );
}
