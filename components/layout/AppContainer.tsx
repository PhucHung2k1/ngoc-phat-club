import { cn } from "@/lib/classnames";
import type { PropsWithChildren } from "react";

type AppContainerProps = PropsWithChildren<{
  className?: string;
}>;

export function AppContainer({ className, children }: AppContainerProps) {
  return (
    <div className={cn("mx-auto max-w-7xl px-6 py-8", className)}>
      {children}
    </div>
  );
}
