import * as React from "react";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { Button } from "./Button";

interface FABProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
}

export function FAB({ icon, className, ...props }: FABProps) {
  return (
    <Button
      variant="primary"
      size="icon"
      className={cn(
        "fixed bottom-8 right-8 w-14 h-14 rounded-full shadow-glow animate-bounce hover:animate-none group transition-all duration-300",
        className
      )}
      {...props}
    >
      {icon || <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />}
    </Button>
  );
}
