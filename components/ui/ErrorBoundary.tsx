"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { Card } from "./Card";
import { Button } from "./Button";
import { AlertTriangle, RefreshCw, ShieldAlert } from "lucide-react";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="min-h-[400px] flex items-center justify-center p-6 text-center">
          <Card className="max-w-md p-10 glass border-rose-500/20 space-y-6">
            <div className="w-20 h-20 rounded-full bg-rose-500/10 flex items-center justify-center mx-auto shadow-glow-sm">
              <ShieldAlert className="text-rose-500" size={40} />
            </div>
            <div className="space-y-2">
               <h2 className="text-2xl font-bold tracking-tight">Telemetry Interruption</h2>
               <p className="text-muted-foreground text-sm">
                  A critical exception occurred in the neural diagnostic layer.
                  <span className="block mt-2 font-mono text-[10px] opacity-50 uppercase tracking-widest bg-black/20 p-2 rounded">
                     {this.state.error?.name || "SYS_EXCEPTION"}: {this.state.error?.message?.slice(0, 50)}...
                  </span>
               </p>
            </div>
            <Button 
               onClick={() => window.location.reload()}
               className="w-full h-12 rounded-xl shadow-glow gap-2"
            >
               <RefreshCw size={18} /> Re-Initialize Module
            </Button>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
