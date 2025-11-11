import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  const members = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  return NextResponse.json({ members });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // If roleId provided, resolve role name for denormalized `role` field
    let roleName: string | undefined = body.role;
    if (body.roleId && !roleName) {
      const role = await prisma.role.findUnique({ where: { id: body.roleId } });
      roleName = role?.slug ?? role?.name ?? "member";
    }

    const created = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone ?? null,
        role: roleName ?? "member",
        roleId: body.roleId ?? null,
        imageUrl: body.imageUrl ?? null,
        dupr: body.dupr ?? null,
      },
    });
    return NextResponse.json(
      { member: created, message: "Thêm thành viên thành công" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Lỗi khi thêm thành viên" },
      { status: 500 }
    );
  }
}
