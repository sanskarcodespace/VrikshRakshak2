"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import { Trees } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) alert(error.message);
    else window.location.href = "/dashboard";
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
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
          <CardTitle className="text-3xl font-bold tracking-tight">Access Secure Systems</CardTitle>
          <p className="text-muted-foreground font-medium">Initialize session protocols.</p>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest ml-1">Identity_ID (Email)</label>
              <Input 
                type="email" 
                placeholder="protector@vrikshrakshak.ai" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Access_Cipher</label>
                <Link href="/forgot-password" title="Forgot Password" className="text-xs text-primary hover:underline">Forgot?</Link>
              </div>
              <Input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full h-12 rounded-2xl shadow-glow text-lg" disabled={loading}>
              {loading ? "AUTHENTICATING..." : "INITIALIZE_LOGIN"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/10"></span></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-transparent px-2 text-muted-foreground font-bold">OR_EXTERNAL_IDENTITY</span></div>
          </div>

          <Button variant="outline" className="w-full py-6 rounded-2xl glass hover:bg-white/5 gap-3" onClick={handleGoogleLogin}>
            <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
            Continue with Google
          </Button>
        </CardContent>

        <CardFooter className="flex justify-center border-t border-white/5 pt-6">
          <p className="text-sm text-muted-foreground">
            New Protector? <Link href="/signup" title="Create Account" className="text-primary font-bold hover:underline">Register Identity</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
