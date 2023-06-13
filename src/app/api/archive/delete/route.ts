import prisma from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id") as string;
    await prisma.archive.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({ msg: "Delete archive success" });
  } catch (error) {
    return NextResponse.json({ status: 400 });
  }
}
