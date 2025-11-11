import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/classnames";

type PageHeaderProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  backHref?: string;
  backLabel?: ReactNode;
  align?: "left" | "center";
  size?: "lg" | "xl";
  className?: string;
};

const TITLE_STYLES: Record<NonNullable<PageHeaderProps["size"]>, string> = {
  lg: "text-4xl md:text-5xl",
  xl: "text-5xl md:text-6xl",
};

export function PageHeader({
  title,
  subtitle,
  backHref,
  backLabel = "← Về trang chủ",
  align = "center",
  size = "lg",
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "mb-12 text-white",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      <h1 className={cn("font-bold mb-4", TITLE_STYLES[size])}>{title}</h1>
      {subtitle ? (
        <p className="text-lg md:text-xl opacity-90">{subtitle}</p>
      ) : null}
      {backHref ? (
        <div className={align === "center" ? "mt-2" : "mt-4"}>
          <Link
            href={backHref}
            className="inline-flex items-center justify-center text-sm font-medium underline underline-offset-4 text-white/90 hover:text-white"
          >
            {backLabel}
          </Link>
        </div>
      ) : null}
    </header>
  );
}
