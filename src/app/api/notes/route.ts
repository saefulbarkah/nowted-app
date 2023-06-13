import prisma from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: Request) {
  try {
    const body = await req.json();
    const data = await prisma.note.findMany({
      where: {
        userId: body.userId,
        folderId: body.folderId,
        deletedAt: null,
      },
      include: {
        Archived: true,
      },
    });
    return NextResponse.json(data);
  } catch (error) {}
}
