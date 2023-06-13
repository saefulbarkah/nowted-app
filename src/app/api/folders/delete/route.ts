import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id") as string;
  await prisma.folder.delete({
    where: {
      id: id,
    },
  });
  return NextResponse.json({ msg: "Delete folder success" });
}
