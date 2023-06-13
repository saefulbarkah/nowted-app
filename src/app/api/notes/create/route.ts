import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = await prisma.folder.findFirst({
      where: { can_deleted: false },
    });
    await prisma.note.create({
      data: {
        id: body.id,
        title: body.title,
        content: body.content,
        userId: body.userId,
        folderId: data?.id,
      },
    });
    return NextResponse.json({ msg: "Create Note Success" });
  } catch (error) {
    return NextResponse.json({ msg: error, status: 400 });
  }
}
