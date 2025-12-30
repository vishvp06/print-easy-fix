import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface DuplexAnimationProps {
  mode: "none" | "long-edge" | "short-edge";
  orientation: "portrait" | "landscape";
}

export const DuplexAnimation = ({ mode, orientation }: DuplexAnimationProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (mode !== "none") {
      const interval = setInterval(() => {
        setIsFlipped((prev) => !prev);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [mode]);

  const isPortrait = orientation === "portrait";
  const flipAxis = mode === "long-edge" 
    ? (isPortrait ? "Y" : "X")
    : (isPortrait ? "X" : "Y");

  return (
    <div className="bg-muted/50 rounded-xl p-6 border border-border">
      <div className="flex items-start gap-6">
        {/* Animation Preview */}
        <div className="flex-shrink-0">
          <div className="relative" style={{ perspective: "500px" }}>
            <div
              className={cn(
                "relative transition-transform duration-700",
                isPortrait ? "w-20 h-28" : "w-28 h-20"
              )}
              style={{
                transformStyle: "preserve-3d",
                transform: mode !== "none" && isFlipped
                  ? `rotate${flipAxis}(180deg)`
                  : "rotateY(0deg)",
              }}
            >
              {/* Front */}
              <div
                className={cn(
                  "absolute inset-0 rounded-lg border-2 flex items-center justify-center font-bold text-lg",
                  "bg-card border-accent text-accent"
                )}
                style={{ backfaceVisibility: "hidden" }}
              >
                <div className="text-center">
                  <span className="block text-2xl">1</span>
                  <span className="text-xs opacity-60">Front</span>
                </div>
                {/* Page lines */}
                <div className="absolute top-3 left-3 right-3 space-y-1">
                  <div className="h-0.5 bg-current opacity-20 rounded" />
                  <div className="h-0.5 bg-current opacity-20 rounded w-3/4" />
                </div>
              </div>

              {/* Back */}
              <div
                className={cn(
                  "absolute inset-0 rounded-lg border-2 flex items-center justify-center font-bold text-lg",
                  "bg-card border-primary text-primary"
                )}
                style={{
                  backfaceVisibility: "hidden",
                  transform: `rotate${flipAxis}(180deg)`,
                }}
              >
                <div className="text-center">
                  <span className="block text-2xl">2</span>
                  <span className="text-xs opacity-60">Back</span>
                </div>
                {/* Page lines */}
                <div className="absolute top-3 left-3 right-3 space-y-1">
                  <div className="h-0.5 bg-current opacity-20 rounded" />
                  <div className="h-0.5 bg-current opacity-20 rounded w-3/4" />
                </div>
              </div>
            </div>

            {/* Flip indicator */}
            {mode !== "none" && (
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                <div className="flex items-center gap-1">
                  <div className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    !isFlipped ? "bg-accent" : "bg-border"
                  )} />
                  <div className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    isFlipped ? "bg-primary" : "bg-border"
                  )} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Explanation */}
        <div className="flex-1">
          <h4 className="font-semibold text-foreground mb-2">
            {mode === "none" && "One Side Only"}
            {mode === "long-edge" && "Long Edge Binding"}
            {mode === "short-edge" && "Short Edge Binding"}
          </h4>
          <p className="text-sm text-muted-foreground mb-3">
            {mode === "none" && "Print on one side of the paper only. Best for single-sided documents."}
            {mode === "long-edge" && (
              isPortrait
                ? "Flip like a book. The back side prints so you flip along the long (left) edge. Best for standard documents and reports."
                : "Flip like a notepad. The back side prints so you flip along the long (top) edge."
            )}
            {mode === "short-edge" && (
              isPortrait
                ? "Flip like a notepad. The back side prints so you flip along the short (top) edge. Best for presentations and calendars."
                : "Flip like a book. The back side prints so you flip along the short (left) edge."
            )}
          </p>
          
          {mode !== "none" && (
            <div className="flex items-center gap-2 text-xs text-accent">
              <span className="w-3 h-3 rounded-full bg-accent animate-pulse" />
              Animation showing how pages will flip
            </div>
          )}
        </div>
      </div>

      {/* Visual Binding Guide */}
      {mode !== "none" && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-around text-center text-sm">
            <div>
              <div className={cn(
                "w-12 h-16 mx-auto mb-2 rounded border-2 relative",
                isPortrait ? "border-accent" : "border-border"
              )}>
                {isPortrait && mode === "long-edge" && (
                  <div className="absolute left-0 top-2 bottom-2 w-1 bg-accent rounded-r" />
                )}
                {isPortrait && mode === "short-edge" && (
                  <div className="absolute top-0 left-2 right-2 h-1 bg-accent rounded-b" />
                )}
              </div>
              <span className="text-muted-foreground">Portrait</span>
            </div>
            <div>
              <div className={cn(
                "w-16 h-12 mx-auto mb-2 rounded border-2 relative",
                !isPortrait ? "border-accent" : "border-border"
              )}>
                {!isPortrait && mode === "long-edge" && (
                  <div className="absolute top-0 left-2 right-2 h-1 bg-accent rounded-b" />
                )}
                {!isPortrait && mode === "short-edge" && (
                  <div className="absolute left-0 top-2 bottom-2 w-1 bg-accent rounded-r" />
                )}
              </div>
              <span className="text-muted-foreground">Landscape</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
