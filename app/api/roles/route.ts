import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Ensure this route is never statically evaluated during export
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const base = [
    { id: "admin", slug: "admin", name: "Quản trị" },
    { id: "member", slug: "member", name: "Thành viên" },
  ];

  // If DATABASE_URL is not configured (e.g., Vercel build/export), return fallback
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ roles: base });
  }

  try {
    // Upsert base roles, then return from DB
    for (const r of base) {
      await prisma.role.upsert({
        where: { slug: r.slug },
        update: {},
        create: { slug: r.slug, name: r.name },
      });
    }
    const roles = await prisma.role.findMany({ orderBy: { slug: "asc" } });
    return NextResponse.json({ roles });
  } catch {
    // Fallback to static roles if DB unavailable at runtime
    return NextResponse.json({ roles: base });
  }
}
