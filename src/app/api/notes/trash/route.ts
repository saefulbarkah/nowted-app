import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const body = await req.json();
  const data = await prisma.note.findMany({
    where: {
      userId: body.userId,
      folderId: body.folderId,
      deletedAt: {
        not: null,
      },
    },
  });
  return NextResponse.json(data);
}
