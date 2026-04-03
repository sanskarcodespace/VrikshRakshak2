"use client";

import { useEffect } from "react";
import { ErrorBoundary as UIErrorBoundary } from "@/components/ui/ErrorBoundary";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <UIErrorBoundary>
       <div className="hidden">Error detected: {error.message}</div>
    </UIErrorBoundary>
  );
}
