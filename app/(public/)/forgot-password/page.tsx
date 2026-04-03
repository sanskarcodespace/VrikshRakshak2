"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/Card";
import Link from "next/link";
import { Trees } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const supabase = createClient();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
    if (error) alert(error.message);
    else setSent(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6 relative overflow-hidden">
      <Card className="max-w-md w-full glass border-white/10 shadow-glow relative z-10 p-4">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold tracking-tight">Reset_Access_Cipher</CardTitle>
          <p className="text-muted-foreground font-medium">Recover your identity access.</p>
        </CardHeader>

        <CardContent className="space-y-6">
          {!sent ? (
            <form onSubmit={handleReset} className="space-y-4">
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
              <Button type="submit" className="w-full h-12 rounded-2xl shadow-glow text-lg" disabled={loading}>
                {loading ? "SENDING..." : "SEND_RESET_LINK"}
              </Button>
            </form>
          ) : (
            <div className="text-center py-8 space-y-4">
               <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                  <Trees size={32} />
               </div>
               <p className="text-lg font-medium">Reset link sent to your inbox.</p>
               <Link href="/login" className="text-primary font-bold hover:underline">Return to Login</Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
