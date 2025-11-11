import type { PropsWithChildren } from "react";
import { cn } from "@/lib/classnames";

type SurfaceCardProps = PropsWithChildren<{
  className?: string;
}>;

export function SurfaceCard({ className, children }: SurfaceCardProps) {
  return (
    <div className={cn("bg-white rounded-xl p-8 shadow", className)}>
      {children}
    </div>
  );
}
