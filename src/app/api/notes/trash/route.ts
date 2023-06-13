import prisma from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  const folderId = req.nextUrl.searchParams.get("folderId");
  const data = await prisma.note.findMany({
    where: {
      userId: userId,
      folderId: folderId,
      deletedAt: {
        not: null,
      },
    },
  });
  return NextResponse.json(data);
}
