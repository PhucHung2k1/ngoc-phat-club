import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    let roleName: string | undefined = body.role;
    if (body.roleId && !roleName) {
      const role = await prisma.role.findUnique({ where: { id: body.roleId } });
      roleName = role?.slug ?? role?.name ?? undefined;
    }

    const updated = await prisma.user.update({
      where: { id: params.id },
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone ?? null,
        role: roleName ?? undefined,
        roleId: body.roleId ?? undefined,
        imageUrl: body.imageUrl ?? undefined,
        dupr: body.dupr ?? undefined,
      },
    });
    return NextResponse.json({ member: updated });
  } catch (error) {
    return NextResponse.json(
      { error: "Lỗi khi cập nhật thành viên" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.user.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Lỗi khi xóa thành viên" },
      { status: 500 }
    );
  }
}
