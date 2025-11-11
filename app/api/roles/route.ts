import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  // Ensure base roles exist
  const base = [
    { slug: "admin", name: "Quản trị" },
    { slug: "member", name: "Thành viên" },
  ];

  for (const r of base) {
    await prisma.role.upsert({
      where: { slug: r.slug },
      update: {},
      create: { slug: r.slug, name: r.name },
    });
  }

  const roles = await prisma.role.findMany({ orderBy: { slug: "asc" } });
  return NextResponse.json({ roles });
}
