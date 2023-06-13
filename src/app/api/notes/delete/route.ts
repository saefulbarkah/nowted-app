import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id") as string;
    await prisma.note.updateMany({
      where: {
        id: {
          in: id,
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
