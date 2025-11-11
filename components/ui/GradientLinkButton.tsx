import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/classnames";

type GradientLinkButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function GradientLinkButton({
  href,
  children,
  className,
}: GradientLinkButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold text-white shadow transition-transform duration-200",
        "bg-gradient-to-br from-indigo-500 to-purple-600 hover:-translate-y-0.5 hover:shadow-indigo-300/40 active:translate-y-0",
        className
      )}
    >
      {children}
    </Link>
  );
}
