import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id") as string;
    await prisma.note.updateMany({
      where: {
        id: {
          in: id,
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
