"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/Card";
import Link from "next/link";
import { Trees, ShieldCheck, Mail, Lock, User } from "lucide-react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });
    if (error) alert(error.message);
    else alert("Check your email for the confirmation link!");
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full" />

      <Card className="max-w-md w-full glass border-white/10 shadow-glow relative z-10 p-4">
        <CardHeader className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-primary-gradient rounded-xl flex items-center justify-center shadow-glow">
              <Trees className="text-white" size={24} />
            </div>
          </Link>
          <CardTitle className="text-3xl font-bold tracking-tight">Join the Network</CardTitle>
          <p className="text-muted-foreground font-medium">Become a Protector of our global ecosystems.</p>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest ml-1">Full_Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input 
                  className="pl-12"
                  placeholder="John Doe" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest ml-1">Identity_Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input 
                  className="pl-12"
                  type="email" 
                  placeholder="protector@vrikshrakshak.ai" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest ml-1">Secure_Cipher</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input 
                  className="pl-12"
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full h-12 rounded-2xl shadow-glow text-lg" disabled={loading}>
              {loading ? "PROCESSING..." : "REGISTER_IDENTITY"}
            </Button>
          </form>

          <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest leading-relaxed">
            By registering, you agree to the <span className="text-primary cursor-pointer hover:underline">Genetic_Privacy_Protocol</span> and <span className="text-primary cursor-pointer hover:underline">Impact_Terms</span>.
          </p>
        </CardContent>

        <CardFooter className="flex justify-center border-t border-white/5 pt-6">
          <p className="text-sm text-muted-foreground">
            Known Identity? <Link href="/login" className="text-primary font-bold hover:underline">Access Terminal</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
