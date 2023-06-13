import prisma from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  const folderId = req.nextUrl.searchParams.get("folderId");
  const data = await prisma.note.findMany({
    where: {
      userId: userId,
      folderId: folderId,
    },
  });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  try {
    let folder = null;
    const body = await req.json();
    if (!body.folderId) {
      const data = await prisma.folder.findFirst({
        where: { can_deleted: false },
      });
      folder = data?.id;
    }
    await prisma.note.upsert({
      where: { id: body.id },
      update: {
        title: body.title,
        content: body.content,
        folderId: body.folderId,
      },
      create: {
        id: body?.id,
        title: body.title,
        content: body.content,
        userId: body.userId,
        folderId: folder,
      },
    });
    return NextResponse.json({ msg: "Success", folderId: folder });
  } catch (error) {
    return NextResponse.json({ msg: error, status: 400 });
  }
}
