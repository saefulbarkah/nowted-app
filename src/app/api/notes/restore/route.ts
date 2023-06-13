import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    await prisma.note.updateMany({
      where: {
        id: {
          in: body.id,
        },
      },
      data: {
        deletedAt: null,
      },
    });
    return NextResponse.json({ msg: "Restore Success" });
  } catch (error) {
    return NextResponse.json({ msg: error, status: 400 });
  }
}
