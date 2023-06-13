import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  await prisma.folder.delete({
    where: {
      id: body.id,
    },
  });
  return NextResponse.json({ msg: "Delete folder success" });
}
