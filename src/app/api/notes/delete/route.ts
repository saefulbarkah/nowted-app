import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    await prisma.note.updateMany({
      where: {
        id: {
          in: body.id,
        },
      },
      data: {
        deletedAt: new Date(),
      },
    });
    return NextResponse.json({ msg: "Delete Success" });
  } catch (error) {
    return NextResponse.json({ msg: error, status: 400 });
  }
}
